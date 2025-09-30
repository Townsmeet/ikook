import React from "react";

import { Navigation } from "@/components/auth/Navigation";
import { Footer } from "@/components/footer/footer";
import PrivacySection from "@/components/privacy/privacy-section";

const Index = () => {
  const privacySections = [
    {
      title: "Collection of personal information",
      content: `1.1 Personal information which we may collect from you includes the following:
(a) name;
(b) contact details;
1.2 If we receive your personal information from third parties, we will protect it as set out in this Privacy Policy.
1.3 If you provide us with third party personal information then you warrant to us that you have the third party's consent to provide this.`,
    },
    {
      title: "Use and disclosure of personal information",
      content: `2.1 Your personal information will be used for the following purposes:
(a) to contact and communicate with you;
(b) internal record keeping;
(c) direct and indirect marketing;
(d) data analytics;
2.2 We may disclose personal information to:
(a) courts, tribunals, regulatory authorities and law enforcement officers as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights;
(b) third parties, including agents or contractors, who assist us in providing information, products, services or direct marketing to you (these parties may be located outside of UK, for example, they may be located in (the United States of America, the Australia, etc.); and
(c) third parties to collect and process data (such third parties may store data outside of UK, for example in (the United States of America, the Australia, etc.).
2.3 Where we disclose your personal information to third parties for these purposes, we will request that the third party follow this Privacy Policy regarding handling of your personal information.`,
    },
    {
      title: "Change of control",
      content: `3.1 If there is a change of control of our business, we reserve the right to transfer, to the extent permissible by law, our user databases, together with any personal information and non-personal information contained in those databases. This information may be disclosed to a potential purchaser.`,
    },
    {
      title: "Storage and security",
      content: `4.1 Your personal information is hosted by [Amazon]on servers located in [UK].
4.2 Whilst reasonable measures, for example, [details of security procedures in place], are taken to safeguard against unauthorised disclosures of information, we cannot assure you that personal information that we collect will not be disclosed in amanner that is inconsistent with this Privacy Policy.
4.3 No information transmitted over the Internet can be guaranteed to be secure. We cannot guarantee the security of any information that you transmit to or receive from us. The transmission and exchange of information is carried out at your own risk.`,
    },
    {
      title: "Your rights to correct and access",
      content: `5.1 Providing us with your personal information is optional. You are not required to provide us with any personal information, however, incomplete or inaccurate information may affect your use of our Website and App.When you provide us with your personal information, you consent to the terms in this Privacy Policy.
5.2 You may request details of personal information that we hold about you in certain circumstances as set out in the Privacy Act 1988(Cth) (Privacy Act). Please note that:
(a) if we agree to provide you with details of the personal information we hold about you, we may charge an administrative fee; and
(b) we have rights in certain circumstances under the Privacy Act to refuse to provide you with the information we hold about you. If we refuse to provide you with access, we will provide you with written reasons for our refusal.
5.3 If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant or misleading, please send an email to ourPrivacy Contact requesting a change in your personal information. We will respond to any request within a reasonable time.`,
    },
    {
      title: "Links to third party websites",
      content: `6.1 Our Website and App may contain links to third party websites.
6.2 Third party websites are not governed by our Privacy Policy and we do not have any control over third party websites. We are not responsible for the protection of any information which you provide whilst visiting such third party websites.`,
    },
    {
      title: "Cookies, web beacons and data analytics",
      content: `7.1 We may:
(a) log information in relation to your access and use of our Website and App;
(b) use cookies and web beacons from time to time; and
(c) use Google Analytics and similar software and services to collect and process your data. Information about how Google uses your data is located at www.google.com/policies/privacy/partners or any other URL which Google may provide from time to time.`,
    },
    {
      title: "Unsubscribe",
      content: `8.1 To unsubscribe from our e-mail database, or opt out of communications, please send us an email.`,
    },
    {
      title: "Complaints",
      content: `9.1 If you have any complaints in relation to the collection, use or disclosure of your personal information, please send an email to our Privacy Contact with details of the breach.
9.2 We aim to investigate and respond to your complaint within 10 business days. We will set out in our response the outcome of our investigations and if there has been a breach what actions we will take to remedy that breach.`,
    },
  ];

  return (
    <div className="w-full relative bg-white">
      <Navigation />

      <main className="w-full flex justify-center relative px-[91px] py-0">
        <div className="w-[1259px] shrink-0 relative mt-[99px] max-sm:w-full lg:pr-[420px] xl:pr-[520px] mb-20 md:mb-28 lg:mb-32">
          <header className="mb-[99px]">
            <h1 className="text-[#323335] text-[70px] font-bold leading-[71.4px] w-[504px] h-[71px] mb-[74px]">
              Privacy
              <span className="ml-3 relative inline-block">
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FCC01C] z-[2]" />
                <span className="relative z-[3]">Policy</span>
              </span>
            </h1>

            <div className="w-[950px] text-[rgba(50,51,53,0.70)] text-xl font-medium mb-[52px] max-sm:w-full">
              <p className="mb-4">
                This Privacy Policy sets out our commitment to protecting the
                privacy of your personal information that we collect through our
                website www.ikook.co.uk and application iKook app.
              </p>
              <p className="mb-4">
                Please read this Privacy Policy carefully. Please contact us if
                you have any questions.
              </p>
              <p>
                In providing us with personal information, you indicate that you
                have had sufficient opportunity to access this Privacy Policy
                and that you have read and accepted it.
              </p>
            </div>

            <p className="w-[1257px] text-[rgba(50,51,53,0.70)] text-justify text-xl font-medium max-sm:w-full">
              This Privacy Policy maybe amended, including with changes,
              additions and deletions, from time to time, in our sole
              discretion. Your continued use of our Website and App following
              any amendments indicates that you accept the amendments. You
              should check this Privacy Policy regularly.
            </p>
          </header>

          <div className="space-y-[43px]">
            {privacySections.map((section, index) => (
              <PrivacySection
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </div>

        <aside className="hidden lg:inline-flex justify-end items-start absolute w-[510px] h-[510px] right-0 top-[107px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/80d10c7950864b9b01b5f834456c477951c0541f?width=784"
            alt="Privacy Protection Illustration"
            className="w-[392px] h-[392px]"
          />
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
