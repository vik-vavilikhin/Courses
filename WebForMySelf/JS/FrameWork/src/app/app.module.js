import {wfModule} from "../framework/index";
import {appComponent} from "./app.component";

class AppModule extends wfModule {
  constructor(config) {
    super(config)
  }
}

export const appModule = new AppModule({
  comments: [
    appComponent

  ]
})