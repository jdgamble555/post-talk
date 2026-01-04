<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Post Page</h1>
<p>This is a post page for a specific user.</p>
<p>username: {page.params.username}</p>
<p>post id: {page.params.pid}</p>
