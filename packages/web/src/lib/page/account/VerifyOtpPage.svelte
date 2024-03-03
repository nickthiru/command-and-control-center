<script>
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Button, Label, Input } from 'flowbite-svelte';
  import SvelteOtp from "@k4ung/svelte-otp";

  let OTP_LENGTH = 4;
  let otp = "";
  // let otp = new Array(OTP_LENGTH).fill("");

  // $: console.log("otp: " + otp);


  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Inside 'handleFormSubmit()' in OtpVerificationPage");
    console.log("otp: " + otp);

    otp = "";
  }
</script>>


<Section name="register">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6 items-center" action="/">

        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0 mx-auto">OTP Verification</h3>
        
        <!-- <div class="flex justify-evenly space-x-4">
          {#each otp as field, index}
            <Input type="text" bind:value={otp[index]} class="text-center" />          
          {/each}
        </div> -->

        <SvelteOtp numOfInputs={OTP_LENGTH} bind:value={otp} inputClass="rounded-md" />

        <Button type="submit" on:click={handleFormSubmit} class="w-24">Verify</Button>
      </form>
    </div>
  </Register>
</Section>