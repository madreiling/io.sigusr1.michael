import 'dom4';
import '@webcomponents/custom-elements';
import 'mutation-observer';
import * as Turbo from "@hotwired/turbo"

import "./application.css";

export { default as HeaderControllerElement } from "./_shared/header/header-controller";
export { default as FooterControllerElement } from "./_shared/footer/footer-controller";
export { default as HomeControllerElement } from "./home/home-controller";
export { default as BioControllerElement } from "./bio/bio-controller";
export { default as ContactControllerElement } from "./contact/contact-controller";
export { default as ResumeControllerElement } from "./resume/resume-controller";

// Not publicly shared 
//export { default as BackgroundControllerElement } from "./_shared/background/background-controller";

Turbo.setProgressBarDelay(1000);
