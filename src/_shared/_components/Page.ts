import { targets } from "@github/catalyst"
import { gsap } from "gsap";


export default abstract class Page extends HTMLElement {
    @targets animatedElements: HTMLElement[];

    connectedCallback() {
        document.querySelector("body").style.opacity = `1`;
        document.addEventListener("turbo:before-render", this.onTurboBeforeRender);
        this.animateIn()
    }

    disconnectedCallback() {
        document.removeEventListener("turbo:before-render", this.onTurboBeforeRender);
    }

    onTurboBeforeRender = async (e: CustomEvent) => {
        e.preventDefault()
        await this.animateOut()
        e.detail.resume()
    }

    animateIn = async () => {
        const promise = new Promise<void>((resolve, reject) => {
            gsap.from(this.animatedElements, {
                y: 15,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                onComplete: () => {
                    resolve();
                }
            })
        });
        await promise;
    }

    animateOut = async () => {
        const promise = new Promise<void>((resolve, reject) => {
            gsap.to(this.animatedElements, {
                y: -15,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                onComplete: () => {
                    resolve();
                }
            })
        });
        //await promise;

        // Always wait a flat 450ms instead of waiting for the full animation to complete
        await new Promise(r => setTimeout(r, 450));  
    }
}