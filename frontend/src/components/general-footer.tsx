import Footer from "./footer";

export default function GeneralFooter() {

    const footerButtonClassNames = "text-yellow-300 hover:text-yellow-200 transitiond duration-300";
    const footerTextClassNames = "text-neutral-500";

    return (
        <Footer
          className="bg-neutral-800! border-0!"
          logo="icons/spending-tracker.png"
          texts={[
            {
              title: "Website Developed by",
              content: (
                <ul className="space-y-1">
                  <li>
                    <a href="https://khian.netlify.app/" target="_blank" title="Developer's official Website" className={footerButtonClassNames}>
                      Khian Victory D. Calderon
                    </a>
                  </li>
                </ul>
              ),
            },
            {
              title: "Misc",
              content: (
                <ul className="space-y-1">
                  <li>
                    <a href="https://khianvictorycalderon.github.io/donation/donate.html" target="_blank" title="Developer's official donation page" className={footerButtonClassNames}>
                      Donate to Khian
                    </a>
                  </li>
                </ul>
              ),
            },
            {
              title: "Tech Stacks",
              content: (
                <ul className="space-y-1">
                  <li>
                    <span className={footerTextClassNames}>
                      React JS
                    </span>
                  </li>
                  <li>
                    <span className={footerTextClassNames}>
                      Express JS
                    </span>
                  </li>
                  <li>
                    <span className={footerTextClassNames}>
                      MongoDB
                    </span>
                  </li>
                </ul>
              ),
            },
          ]}
        />
    )
}