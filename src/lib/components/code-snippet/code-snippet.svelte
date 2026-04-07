<script lang="ts">
	import './code-snippet.css';
	import classnames from '$utils/classnames';
	import { CSC } from './code-snippet.record';

	type TokenType =
		| 'plain'
		| 'comment'
		| 'keyword'
		| 'script'
		| 'string'
		| 'number'
		| 'function'
		| 'tag'
		| 'component'
		| 'attribute';

	type CodeToken = {
		type: TokenType;
		text: string;
	};

	type HighlightContext = 'markup' | 'script' | 'style';

	type HighlightResult = {
		tokens: CodeToken[];
		inBlockComment: boolean;
		context: HighlightContext;
	};

	const KEYWORDS = new Set([
		'as',
		'await',
		'break',
		'case',
		'catch',
		'class',
		'const',
		'continue',
		'default',
		'else',
		'export',
		'extends',
		'false',
		'finally',
		'for',
		'from',
		'function',
		'if',
		'import',
		'in',
		'instanceof',
		'interface',
		'let',
		'new',
		'null',
		'of',
		'return',
		'satisfies',
		'static',
		'super',
		'switch',
		'throw',
		'true',
		'try',
		'type',
		'typeof',
		'undefined',
		'var',
		'void',
		'while'
	]);

	const MARKUP_LANGUAGES = new Set(['html', 'svelte', 'xml', 'astro']);
	const FILE_EXTENSION_LANGUAGE_MAP: Record<string, string> = {
		astro: 'astro',
		html: 'html',
		svelte: 'svelte',
		svg: 'xml',
		xml: 'xml'
	};

	const isIdentifierStart = (value: string) => /[A-Za-z_$]/.test(value);
	const isIdentifierChar = (value: string) => /[A-Za-z0-9_$:-]/.test(value);
	const isCapitalizedIdentifier = (value: string) => /^[A-Z]/.test(value);
	const normalizeLanguage = (value: string) => value.trim().toLowerCase();
	const inferLanguageFromFilename = (value: string) => {
		let extension = value.trim().split('.').pop()?.toLowerCase() ?? '';

		return FILE_EXTENSION_LANGUAGE_MAP[extension] ?? '';
	};
	const inferLanguageFromCode = (value: string) => {
		let snippet = value.trimStart();

		if (!snippet) {
			return '';
		}

		if (
			/[<{]#/.test(snippet) ||
			snippet.includes('{@') ||
			snippet.includes('<svelte:') ||
			snippet.includes('<script') ||
			snippet.includes('<style')
		) {
			return 'svelte';
		}

		if (/^<\/?[A-Za-z]/.test(snippet) || snippet.includes('/>')) {
			return 'html';
		}

		return '';
	};
	const findMatchingBrace = (value: string, start: number) => {
		let depth = 0;
		let index = start;

		while (index < value.length) {
			let current = value[index];

			if (current === '"' || current === "'" || current === '`') {
				index = findClosingQuote(value, index, current) + 1;
				continue;
			}

			if (current === '{') {
				depth += 1;
			} else if (current === '}') {
				depth -= 1;

				if (depth === 0) {
					return index;
				}
			}

			index += 1;
		}

		return value.length;
	};
	const highlightScriptSegment = (
		value: string,
		inBlockComment = false
	): Omit<HighlightResult, 'context'> => {
		let tokens: CodeToken[] = [];
		let index = 0;

		while (index < value.length) {
			if (inBlockComment) {
				let commentEnd = value.indexOf('*/', index);

				if (commentEnd === -1) {
					pushToken(tokens, 'comment', value.slice(index));
					return { tokens, inBlockComment: true };
				}

				pushToken(tokens, 'comment', value.slice(index, commentEnd + 2));
				index = commentEnd + 2;
				inBlockComment = false;
				continue;
			}

			if (value.startsWith('//', index)) {
				pushToken(tokens, 'comment', value.slice(index));
				break;
			}

			if (value.startsWith('/*', index)) {
				let commentEnd = value.indexOf('*/', index + 2);

				if (commentEnd === -1) {
					pushToken(tokens, 'comment', value.slice(index));
					return { tokens, inBlockComment: true };
				}

				pushToken(tokens, 'comment', value.slice(index, commentEnd + 2));
				index = commentEnd + 2;
				continue;
			}

			let current = value[index];

			if (current === '"' || current === "'" || current === '`') {
				let stringEnd = findClosingQuote(value, index, current);

				pushToken(tokens, 'string', value.slice(index, stringEnd + 1));
				index = stringEnd + 1;
				continue;
			}

			if (/[0-9]/.test(current)) {
				let numberStart = index;

				while (index < value.length && /[0-9._]/.test(value[index])) {
					index += 1;
				}

				pushToken(tokens, 'number', value.slice(numberStart, index));
				continue;
			}

			if (isIdentifierStart(current)) {
				let wordStart = index;

				while (index < value.length && isIdentifierChar(value[index])) {
					index += 1;
				}

				let word = value.slice(wordStart, index);

				if (KEYWORDS.has(word)) {
					pushToken(tokens, 'keyword', word);
				} else if (isCapitalizedIdentifier(word)) {
					pushToken(tokens, 'component', word);
				} else {
					pushToken(tokens, 'script', word);
				}

				continue;
			}

			pushToken(tokens, 'plain', current);
			index += 1;
		}

		return { tokens, inBlockComment: false };
	};
	const highlightExpression = (value: string, start: number) => {
		let tokens: CodeToken[] = [];
		let end = findMatchingBrace(value, start);
		let expression = end < value.length ? value.slice(start + 1, end) : value.slice(start + 1);
		let result = highlightScriptSegment(expression);

		pushToken(tokens, 'plain', '{');
		tokens.push(...result.tokens);

		if (end < value.length) {
			pushToken(tokens, 'plain', '}');
		}

		return {
			tokens,
			nextIndex: end < value.length ? end + 1 : value.length
		};
	};
	const getInitialContext = (languageName: string): HighlightContext =>
		MARKUP_LANGUAGES.has(languageName) ? 'markup' : 'script';
	const getNextMarkupContext = (value: string) => {
		let trimmed = value.trimStart().toLowerCase();

		if (trimmed.startsWith('<script') && !trimmed.includes('<\/script>')) {
			return 'script';
		}

		if (trimmed.startsWith('<style') && !trimmed.includes('</style>')) {
			return 'style';
		}

		return 'markup';
	};
	const pushToken = (tokens: CodeToken[], type: TokenType, text: string) => {
		if (!text) {
			return;
		}

		let previous = tokens.at(-1);

		if (previous && previous.type === type) {
			previous.text += text;
			return;
		}

		tokens.push({ type, text });
	};
	const findClosingQuote = (value: string, start: number, quote: string) => {
		let index = start + 1;

		while (index < value.length) {
			if (value[index] === '\\') {
				index += 2;
				continue;
			}

			if (value[index] === quote) {
				return index;
			}

			index += 1;
		}

		return value.length - 1;
	};
	const isMarkupStart = (value: string, index: number, languageName: string) => {
		if (!MARKUP_LANGUAGES.has(languageName) || value[index] !== '<') {
			return false;
		}

		let nextChar = value[index + 1] ?? '';

		return nextChar === '/' || /[A-Za-z]/.test(nextChar);
	};
	const highlightTag = (
		value: string,
		start: number
	): { tokens: CodeToken[]; nextIndex: number } => {
		let tokens: CodeToken[] = [];
		let index = start;

		pushToken(tokens, 'plain', '<');
		index += 1;

		if (value[index] === '/') {
			pushToken(tokens, 'plain', '/');
			index += 1;
		}

		let tagStart = index;

		while (index < value.length && isIdentifierChar(value[index])) {
			index += 1;
		}

		let tagName = value.slice(tagStart, index);

		pushToken(tokens, isCapitalizedIdentifier(tagName) ? 'component' : 'tag', tagName);

		while (index < value.length) {
			let current = value[index];

			if (current === '>') {
				pushToken(tokens, 'plain', '>');
				return { tokens, nextIndex: index + 1 };
			}

			if (current === '/' && value[index + 1] === '>') {
				pushToken(tokens, 'plain', '/>');
				return { tokens, nextIndex: index + 2 };
			}

			if (/\s/.test(current)) {
				let whitespaceStart = index;

				while (index < value.length && /\s/.test(value[index])) {
					index += 1;
				}

				pushToken(tokens, 'plain', value.slice(whitespaceStart, index));
				continue;
			}

			if (current === '"' || current === "'" || current === '`') {
				let stringEnd = findClosingQuote(value, index, current);

				pushToken(tokens, 'string', value.slice(index, stringEnd + 1));
				index = stringEnd + 1;
				continue;
			}

			if (current === '{') {
				let expression = highlightExpression(value, index);

				tokens.push(...expression.tokens);
				index = expression.nextIndex;
				continue;
			}

			if (current === '=') {
				pushToken(tokens, 'plain', current);
				index += 1;
				continue;
			}

			let attributeStart = index;

			while (index < value.length && !/[\s=>/]/.test(value[index])) {
				index += 1;
			}

			pushToken(tokens, 'attribute', value.slice(attributeStart, index));
		}

		return { tokens, nextIndex: index };
	};
	const highlightLine = (
		value: string,
		languageName: string,
		inBlockComment = false,
		context: HighlightContext = getInitialContext(languageName)
	): HighlightResult => {
		if (context === 'script') {
			let closingTagIndex = value.indexOf('<\/script>');

			if (closingTagIndex === -1) {
				let result = highlightScriptSegment(value, inBlockComment);

				return {
					tokens: result.tokens,
					inBlockComment: result.inBlockComment,
					context: 'script'
				};
			}

			let tokens = [
				...highlightScriptSegment(value.slice(0, closingTagIndex), inBlockComment).tokens,
				...highlightTag(value, closingTagIndex).tokens
			];

			return {
				tokens,
				inBlockComment: false,
				context: 'markup'
			};
		}

		if (context === 'style') {
			let closingTagIndex = value.indexOf('</style>');

			if (closingTagIndex === -1) {
				let tokens: CodeToken[] = [];

				pushToken(tokens, 'plain', value || ' ');

				return {
					tokens,
					inBlockComment: false,
					context: 'style'
				};
			}

			let tokens: CodeToken[] = [];

			pushToken(tokens, 'plain', value.slice(0, closingTagIndex));
			tokens.push(...highlightTag(value, closingTagIndex).tokens);

			return {
				tokens,
				inBlockComment: false,
				context: 'markup'
			};
		}

		let tokens: CodeToken[] = [];
		let index = 0;

		while (index < value.length) {
			if (inBlockComment) {
				let commentEnd = value.indexOf('*/', index);

				if (commentEnd === -1) {
					pushToken(tokens, 'comment', value.slice(index));
					return { tokens, inBlockComment: true, context: 'markup' };
				}

				pushToken(tokens, 'comment', value.slice(index, commentEnd + 2));
				index = commentEnd + 2;
				inBlockComment = false;
				continue;
			}

			if (isMarkupStart(value, index, languageName)) {
				let tag = highlightTag(value, index);

				tokens.push(...tag.tokens);
				index = tag.nextIndex;
				continue;
			}

			if (value.startsWith('<!--', index)) {
				let commentEnd = value.indexOf('-->', index);

				if (commentEnd === -1) {
					pushToken(tokens, 'comment', value.slice(index));
					return { tokens, inBlockComment: false, context: 'markup' };
				}

				pushToken(tokens, 'comment', value.slice(index, commentEnd + 3));
				index = commentEnd + 3;
				continue;
			}

			if (value.startsWith('//', index)) {
				pushToken(tokens, 'comment', value.slice(index));
				break;
			}

			if (value.startsWith('/*', index)) {
				let commentEnd = value.indexOf('*/', index + 2);

				if (commentEnd === -1) {
					pushToken(tokens, 'comment', value.slice(index));
					return { tokens, inBlockComment: true, context: 'markup' };
				}

				pushToken(tokens, 'comment', value.slice(index, commentEnd + 2));
				index = commentEnd + 2;
				continue;
			}

			let current = value[index];

			if (current === '"' || current === "'" || current === '`') {
				let stringEnd = findClosingQuote(value, index, current);

				pushToken(tokens, 'string', value.slice(index, stringEnd + 1));
				index = stringEnd + 1;
				continue;
			}

			if (current === '{' && ['#', '/', ':', '@'].includes(value[index + 1] ?? '')) {
				pushToken(tokens, 'plain', current);
				index += 1;

				let directiveStart = index;

				while (index < value.length && /[A-Za-z:/-]/.test(value[index])) {
					index += 1;
				}

				pushToken(tokens, 'keyword', value.slice(directiveStart, index));
				continue;
			}

			if (current === '{') {
				let expression = highlightExpression(value, index);

				tokens.push(...expression.tokens);
				index = expression.nextIndex;
				continue;
			}

			if (/[0-9]/.test(current)) {
				let numberStart = index;

				while (index < value.length && /[0-9._]/.test(value[index])) {
					index += 1;
				}

				pushToken(tokens, 'number', value.slice(numberStart, index));
				continue;
			}

			if (isIdentifierStart(current)) {
				let wordStart = index;

				while (index < value.length && isIdentifierChar(value[index])) {
					index += 1;
				}

				let word = value.slice(wordStart, index);
				let nextNonWhitespace = value.slice(index).match(/^\s*(.)/)?.[1] ?? '';

				if (KEYWORDS.has(word)) {
					pushToken(tokens, 'keyword', word);
				} else if (nextNonWhitespace === '(') {
					pushToken(tokens, 'function', word);
				} else {
					pushToken(tokens, 'plain', word);
				}

				continue;
			}

			pushToken(tokens, 'plain', current);
			index += 1;
		}

		return { tokens, inBlockComment: false, context: getNextMarkupContext(value) };
	};

	let {
		id = '',
		code = '',
		filename = '',
		language = '',
		size = 'md',
		showLineNumbers = true,
		wrap = false,
		ariaLabel = '',
		class: className = ''
	}: Partial<CodeSnippet.Props> = $props();

	let hasHeader = $derived(Boolean(filename || language));
	let resolvedLanguage = $derived.by(() => {
		let explicitLanguage = normalizeLanguage(language);

		if (explicitLanguage) {
			return explicitLanguage;
		}

		return inferLanguageFromFilename(filename) || inferLanguageFromCode(code);
	});
	let lines = $derived.by(() => {
		let normalized = code.replace(/\r\n/g, '\n');

		if (!normalized.length) {
			return [''];
		}

		let snippetLines = normalized.split('\n');

		if (snippetLines.length > 1 && snippetLines.at(-1) === '') {
			snippetLines = snippetLines.slice(0, -1);
		}

		return snippetLines.length ? snippetLines : [''];
	});
	let lineDigits = $derived(String(lines.length).length);
	let snippetClass = $derived(
		classnames('cds', CSC[size], !showLineNumbers && 'cds-no-lines', wrap && 'cds-wrap', className)
	);
	let highlightedLines = $derived.by(() => {
		let inBlockComment = false;
		let context = getInitialContext(resolvedLanguage);

		return lines.map((line) => {
			let result = highlightLine(line, resolvedLanguage, inBlockComment, context);

			inBlockComment = result.inBlockComment;
			context = result.context;

			return result.tokens.length ? result.tokens : [{ type: 'plain', text: ' ' }];
		});
	});
	let snippetAriaLabel = $derived(
		ariaLabel || [filename, language].filter(Boolean).join(' ') || 'Code snippet'
	);
</script>

<div
	id={id || undefined}
	class={snippetClass}
	style={`--cds-line-digits:${lineDigits}; --cds-gutter-width:calc((var(--cds-line-digits, 2) * 0.7ch) + 1.75rem);`}
>
	{#if hasHeader}
		<div class="cds-header">
			{#if filename}
				<span class="cds-file">{filename}</span>
			{:else}
				<span class="cds-file">Snippet</span>
			{/if}

			{#if language}
				<span class="cds-language">{language}</span>
			{/if}
		</div>
	{/if}

	<div class="cds-body">
		<pre class="cds-pre" aria-label={snippetAriaLabel}><code class="cds-code"
				>{#each highlightedLines as line, index}<span class="cds-line"
						>{#if showLineNumbers}<span class="cds-line-number" aria-hidden="true">{index + 1}</span
							>{/if}<span class="cds-line-code"
							>{#each line as token}<span class={`cds-token cds-token-${token.type}`}
									>{token.text}</span
								>{/each}</span
						></span
					>{/each}</code
			></pre>
	</div>
</div>
