import Footer from "./footer";

export default function GeneralFooter() {
    return (
        <Footer
          className="bg-neutral-800! border-0!"
          logo="icons/spending-tracker.png"
          sub_logos={[
            {
              image: "https://cdn-icons-png.flaticon.com/512/25/25231.png", // GitHub
              onClick: () => window.open("https://github.com/yourprofile", "_blank"),
            },
            {
              image: "https://cdn-icons-png.flaticon.com/512/733/733579.png", // Twitter
              onClick: () => window.open("https://twitter.com/yourhandle", "_blank"),
            },
            {
              image: "https://cdn-icons-png.flaticon.com/512/174/174857.png", // LinkedIn
              onClick: () => window.open("https://linkedin.com/in/yourprofile", "_blank"),
            },
          ]}
          texts={[
            {
              title: "Company",
              content: (
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              ),
            },
            {
              title: "Resources",
              content: (
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:text-white">
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                </ul>
              ),
            },
            {
              title: "Legal",
              content: (
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              ),
            },
          ]}
        />
    )
}