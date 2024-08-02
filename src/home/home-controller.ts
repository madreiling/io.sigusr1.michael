import { controller, target } from "@github/catalyst"
import { gsap } from "gsap";
import { SplitText } from "../_shared/_components/SplitText"
import Page from "../_shared/_components/Page"
import HeaderControllerElement from "../_shared/header/header-controller";


@controller
export default class HomeControllerElement extends Page {
    @target titleElem: HTMLElement;
    @target subtitleElem: HTMLElement;
    @target bioLink: HTMLElement;
    @target resumeLink: HTMLElement;
    @target contactLink: HTMLElement;

    // Override the Page's default animateIn
    animateIn = async () => {
        const promise = new Promise<void>((resolve, reject) => {
            // hide everything
            gsap.to([this.titleElem, this.subtitleElem, this.bioLink, this.resumeLink, this.contactLink], {
                y: 60,
                opacity: 0,
                duration: 0
            })

            // show my name
            let tl = gsap.timeline();
            tl.add('name')
            let title = new SplitText(this.titleElem);
            tl.from(title.chars,{
                opacity:0, 
                duration: 0.75,
                rotationX: -100, 
                rotationY:-100,
                stagger: 0.05,
                onComplete: () => {
                    title.revert();
                }
            }, 'name')
            tl.to(this.titleElem, {
                opacity: 1.0,
                duration: 1.0
            }, 'name')

            // Wait a bit
            tl.delay(0.25);

            // slide everything in
            tl.add('everything-else')
            tl.to([this.titleElem, this.bioLink, this.resumeLink, this.contactLink], {
                y: 0,
                opacity: 1.0,
                duration: 1.0,
                stagger: 0.1
            }, 'everything-else')
            tl.to(this.subtitleElem, {
                y: 0,
                opacity: 1.0,
                duration: 1.25,
                delay: 0
            }, 'everything-else')

            tl.then(() => resolve());
        });
        await promise;
    }

    // Override the Page's default animateOut
    animateOut = async () => {
        const promise = new Promise<void>((resolve, reject) => {
            // Get the new page's href and highlight the selected link
            let href = window.location.pathname;
            this.querySelector(`a[href='${href}']`).classList.add("text-io-highlight");

            // Animate the header in and highlight the selected link
            let header = document.querySelector("header-controller") as HeaderControllerElement;
            header.hide(0);
            header.show();
            header.menuLinks.forEach(e => {
                if(e.getAttribute("href").toString() == href) {
                    e.classList.add("text-io-highlight")
                }
            });

            // Find the positions to move each link to
            const is_small = (window.innerWidth < 768);
            let bio_nav_link = is_small ? header.mobileMenuBtn : header.navBioLink;
            let bodyRect = this.bioLink.firstElementChild.getBoundingClientRect(),
                elemRect = bio_nav_link.getBoundingClientRect(),
                bioOffsetY  = elemRect.top - bodyRect.top,
                bioOffsetX  = elemRect.left - bodyRect.left;

            let resume_nav_link = is_small ? header.mobileMenuBtn : header.navResumeLink;
            let bodyRect1 = this.resumeLink.firstElementChild.getBoundingClientRect(),
                elemRect1 = resume_nav_link.getBoundingClientRect(),
                resumeOffsetY  = elemRect1.top - bodyRect1.top,
                resumeOffsetX  = elemRect1.left - bodyRect1.left;

            let contact_nav_link = is_small ? header.mobileMenuBtn : header.navContactLink;
            let bodyRect2 = this.contactLink.firstElementChild.getBoundingClientRect(),
                elemRect2 = contact_nav_link.getBoundingClientRect(),
                contactOffsetY  = elemRect2.top - bodyRect2.top,
                contactOffsetX  = elemRect2.left - bodyRect2.left;

            // Move the links to those positions
            let tl = gsap.timeline();
            tl.add("start");
            tl.to([this.titleElem, this.subtitleElem], {
                opacity: 0,
                duration: 0.45,
                ease: "power1.inOut",
            }, "start");
            
            tl.to(this.bioLink, {
                x: bioOffsetX,
                y: bioOffsetY,
                duration: 0.35,
                ease: "power1.inOut",
            }, "start")
            tl.to(this.resumeLink, {
                x: resumeOffsetX,
                y: resumeOffsetY,
                duration: 0.35,
                delay: 0.05,
                ease: "power1.inOut",
            }, "start")
            tl.to(this.contactLink, {
                x: contactOffsetX,
                y: contactOffsetY,
                duration: 0.35,
                delay: 0.1,
                ease: "power1.inOut",
            }, "start")

            if(is_small) {
                tl.to([this.bioLink, this.resumeLink, this.contactLink], {
                    opacity: 0, 
                    duration: 0.55, 
                    ease: "power1.inOut",
                }, "start");
            }

            tl.then(() => resolve());
        });

        await promise;
    }
}