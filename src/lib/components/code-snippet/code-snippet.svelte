<script lang="ts">
	import './code-snippet.css';
	import classnames from '$utils/classnames';

	type TokenType =
		| 'plain'
		| 'comment'
		| 'keyword'
		| 'string'
		| 'number'
		| 'function'
		| 'tag'
		| 'attribute';

	type CodeToken = {
		type: TokenType;
		text: string;
	};

	type HighlightResult = {
		tokens: CodeToken[];
		inBlockComment: boolean;
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

	const isIdentifierStart = (value: string) => /[A-Za-z_$]/.test(value);
	const isIdentifierChar = (value: string) => /[A-Za-z0-9_$:-]/.test(value);
	const normalizeLanguage = (value: string) => value.trim().toLowerCase();
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

		pushToken(tokens, 'tag', value.slice(tagStart, index));

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
				let expressionStart = index;

				index += 1;

				while (index < value.length && value[index] !== '}') {
					index += 1;
				}

				if (index < value.length) {
					index += 1;
				}

				pushToken(tokens, 'plain', value.slice(expressionStart, index));
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
		inBlockComment = false
	): HighlightResult => {
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
					return { tokens, inBlockComment: false };
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

		return { tokens, inBlockComment: false };
	};

	let {
		id = '',
		code = '',
		filename = '',
		language = '',
		showLineNumbers = true,
		wrap = false,
		ariaLabel = '',
		class: className = ''
	}: Partial<CodeSnippet.Props> = $props();

	let hasHeader = $derived(Boolean(filename || language));
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
		classnames('cds', !showLineNumbers && 'cds-no-lines', wrap && 'cds-wrap', className)
	);
	let highlightedLines = $derived.by(() => {
		let currentLanguage = normalizeLanguage(language);
		let inBlockComment = false;

		return lines.map((line) => {
			let result = highlightLine(line, currentLanguage, inBlockComment);

			inBlockComment = result.inBlockComment;

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
