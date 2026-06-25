<script>
  import { person } from '../data/content';

  let display = $state(person.roles[0]);
  let index = $state(0);
  let deleting = $state(false);

  $effect(() => {
    const roles = person.roles;
    const current = roles[index % roles.length];
    let timeout;

    if (!deleting && display === current) {
      timeout = setTimeout(() => (deleting = true), 1700);
    } else if (deleting && display === '') {
      deleting = false;
      index = (index + 1) % roles.length;
    } else {
      const next = deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1);
      timeout = setTimeout(() => (display = next), deleting ? 40 : 70);
    }

    return () => clearTimeout(timeout);
  });
</script>

<span class="role-cycler">
  <span class="gradient-text">{display}</span><span class="caret">|</span>
</span>

<style>
  .role-cycler {
    display: inline-block;
    min-height: 1.2em;
  }
  .caret {
    color: var(--color-accent2);
    font-weight: 400;
    animation: blink 1s step-end infinite;
    margin-left: 2px;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .caret { animation: none; }
  }
</style>
