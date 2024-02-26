<script>
  import {Route, Router, Link} from "svelte-routing";
  
  import NavBar from "./lib/common/NavBar.svelte";
  import Container from "./lib/common/Container.svelte";

  import SignUpPage from "./lib/page/SignUpPage.svelte";
  import SignInPage from "./lib/page/SignInPage.svelte";
  import HomePage from "./lib/page/HomePage.svelte";
  import VerifyOtpPage from "./lib/page/VerifyOtpPage.svelte";
  import WebSocketConnection from "./lib/util/WebSocketConnection.svelte";
</script>

<WebSocketConnection />

<Router>

  <Container>
  
    <NavBar />

    <main>
      <Route path={"/"} component={HomePage} />
      <Route path={"/sign-up"} component={SignUpPage} />
      <Route path={"/sign-in"} component={SignInPage} />
      <Route path={"/verify-otp"} component={VerifyOtpPage} />
    </main>

  </Container>

</Router>

<style>

</style>
