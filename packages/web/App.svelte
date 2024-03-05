<script>
  import {Route, Router, Link} from "svelte-routing";
  
  import NavBar from "./lib/common/NavBar.svelte";
  import Container from "./lib/common/Container.svelte";

  // import SignUpPage from "./lib/page/SignUpPage.svelte";
  // import SignInPage from "./lib/page/account/SignInPage.svelte";
  import HomePage from "./lib/page/HomePage.svelte";
  // import VerifyOtpPage from "./lib/page/VerifyOtpPage.svelte";
  import WebSocketConnection from "./lib/util/WebSocketConnection.svelte";
  import MapPage from "./lib/page/map/MapPage.svelte";

  import PubSubBroker from "./src/pubsub-broker.js";
  import DB from "./src/db.js";


  let pubsub = PubSubBroker();
  let db = DB();

</script>

<WebSocketConnection {pubsub}/>

<Router>
  <Container>
  
    <NavBar />

    <main>
      <Route path={"/"} component={HomePage} />
      <!-- <Route path={"/sign-up"} component={SignUpPage} />
      <Route path={"/sign-in"} component={SignInPage} />
      <Route path={"/verify-otp"} component={VerifyOtpPage} /> -->
      <Route path={"/map"} component={MapPage} {pubsub} {db} />

    </main>

  </Container>
</Router>