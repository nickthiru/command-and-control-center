<script>
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
  import { navigate } from 'svelte-routing';
  

  async function handleFormSubmit(event) {

    event.preventDefault();
    console.log("Inside 'handleFormSubmit()' in RegisterPage");

    navigate("/verify-otp");
  }
</script>

<Section name="register">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign Up</h3>
        <Label class="space-y-2">
          <span>Your email</span>
          <Input type="email" name="email" required />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input type="password" name="password" required />
        </Label>
        <Label class="space-y-2">
          <span>Confirm password</span>
          <Input type="password" name="confirm-password" required />
        </Label>
        <div class="flex items-start">
          <Checkbox>I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/"> Terms and Conditions</a></Checkbox>
        </div>
        <Button type="submit" on:click={handleFormSubmit} class="w-full1">Create an account</Button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
          Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
        </div>
      </form>
    </div>
  </Register>
</Section>