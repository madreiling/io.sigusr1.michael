import { controller, target, targets } from "@github/catalyst"
import { gsap } from "gsap";


@controller
export default class HeaderControllerElement extends HTMLElement {
    @target container: HTMLElement;
    @target navHomeLink: HTMLAnchorElement;
    @target navBioLink: HTMLAnchorElement;
    @target navResumeLink: HTMLAnchorElement;
    @target navContactLink: HTMLAnchorElement;
    @target mobileMenuBtn: HTMLElement;
    @target mobileDrawer: HTMLElement;
    @target mobileDrawerHeader: HTMLElement;
    @targets menuLinks: HTMLElement[];

    #sticky = false;
    #stickyFalseClasses = ["h-24"];
    #stickyTrueClasses = ["h-16", "border-b", "backdrop-blur-md", "bg-io-background", "bg-opacity-90"]
    #stickyDrawerFalseClasses = ["h-24"];
    #stickyDrawerTrueClasses = ["h-16"]

    connectedCallback() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener("turbo:before-visit", this.onTurboBeforeVisit);
        document.addEventListener("turbo:visit", this.onTurboVisit);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener("turbo:before-visit", this.onTurboBeforeVisit);
        document.removeEventListener("turbo:visit", this.onTurboVisit);
    }

    handleScroll = (e: Event) => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (!this.#sticky && scrollTop > 0) {
            this.#sticky = true;
            this.container.classList.add(...this.#stickyTrueClasses)
            this.container.classList.remove(...this.#stickyFalseClasses)

            this.mobileDrawerHeader.classList.add(...this.#stickyDrawerTrueClasses)
            this.mobileDrawerHeader.classList.remove(...this.#stickyDrawerFalseClasses)
        }

        if (this.#sticky && scrollTop <= 0) {
            this.#sticky = false;
            this.container.classList.add(...this.#stickyFalseClasses);
            this.container.classList.remove(...this.#stickyTrueClasses)

            this.mobileDrawerHeader.classList.add(...this.#stickyDrawerFalseClasses)
            this.mobileDrawerHeader.classList.remove(...this.#stickyDrawerTrueClasses)
        }
    };

    toggleDrawer = () => {
        this.mobileDrawer.classList.toggle("-translate-x-full")
    }

    closeDrawer = () => {
        this.mobileDrawer.classList.add("-translate-x-full")
    }

    hide = (duration = 1.0) => {
        gsap.to(this.container.children, {
            opacity: 0,
            duration: duration,
            onComplete: () => {
                this.container.classList.add("invisible");
            }
        })
    }

    show = (duration = 1.0) => {
        if(this.container.classList.contains("invisible")) {
            Array.from(this.container.children).forEach(element => {
                (element as HTMLElement).style.opacity = `0`;
            });
            this.container.classList.remove("invisible");
        }
        gsap.to(this.container.children, {
            opacity: 1.0,
            duration: duration,
        })
    }

    onTurboBeforeVisit = (e: CustomEvent) => {
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    }

    onTurboVisit = (e: CustomEvent) => {
        this.mobileDrawer.classList.add("-translate-x-full")

        let href = new URL(e.detail.url).pathname;
        if(href == "/") {
            this.hide();
        }
        else {
            this.show();
        }
        
        this.menuLinks.forEach(e => e.classList.remove("text-io-highlight"));
        this.menuLinks.forEach(e => {
            if(e.getAttribute("href").toString() == href) {
                e.classList.add("text-io-highlight")
            }
        });
    }
}