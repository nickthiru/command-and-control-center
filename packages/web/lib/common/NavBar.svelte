<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input, Alert } from 'flowbite-svelte';
</script>

<Navbar>
  <NavBrand href="/">
    <img src="https://flowbite.com/docs/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
  </NavBrand>
  
  <NavUl class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>

  <div class="flex space-x-2 md:order-2">
    <Button href="/sign-in" size="sm">Sign In</Button>
    <Button href="/sign-up" size="sm">Sign Up</Button>
    <NavHamburger />
  </div>
</Navbar>
