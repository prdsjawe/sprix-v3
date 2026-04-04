<script lang="ts">
	import './code-snippet.css';
	import classnames from '$utils/classnames';

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
		classnames(
			'cds',
			!showLineNumbers && 'cds-no-lines',
			wrap && 'cds-wrap',
			className
		)
	);
	let snippetAriaLabel = $derived(
		ariaLabel || [filename, language].filter(Boolean).join(' ') || 'Code snippet'
	);
</script>

<div
	id={id || undefined}
	class={snippetClass}
	style={`--cds-line-digits:${lineDigits};`}
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
		<pre class="cds-pre" aria-label={snippetAriaLabel}><code class="cds-code">{#each lines as line, index}<span class="cds-line">{#if showLineNumbers}<span class="cds-line-number" aria-hidden="true">{index + 1}</span>{/if}<span class="cds-line-code">{line || ' '}</span></span>{/each}</code></pre>
	</div>
</div>
