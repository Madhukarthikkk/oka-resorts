import LegalPage, { Section, Text, List } from '@/components/LegalPage';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata = {
  title: 'Privacy Policy & Cookies — Oka Resorts, Reddipalli, Visakhapatnam',
  description:
    'How Oka Resorts by Amitha Developers collects, uses and protects your information, and how this website uses cookies.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we protect your information"
      updated="15 October 2026"
      intro="This privacy policy sets out how Amitha Developers (the company behind Oka Resorts, “we”, “us”) uses and protects any information that you give us when you use this website. We are committed to ensuring that your privacy is protected. If we ask you to provide information by which you can be identified when using this website, it will only be used in accordance with this privacy statement. We may change this policy from time to time by updating this page, so please check it now and then. This policy is effective from 15 October 2026."
    >
      <Section title="What we collect">
        <Text>We may collect the following information:</Text>
        <List
          items={[
            'Your name and contact information, including your phone number and email address, when you call us, message us on WhatsApp or write to us.',
            'The content of your message and any preferences you tell us about, such as the plot size you are interested in or a preferred site-visit date.',
            'If you click “Accept” on our cookie banner: information about how you use this website, such as the pages you visit, the Call, WhatsApp, Email, Map, 360° and brochure buttons you click, your device and browser type, your approximate location (city level) and how you reached us. Your IP address is anonymised before it is stored.',
            'Basic technical records (such as IP address, browser type and the pages requested) that our website hosting provider keeps to run and protect the website.',
          ]}
        />
        <Text>This website has no sign-up or enquiry form, so we do not collect your details through the website itself.</Text>
      </Section>

      <Section title="What we do with the information we gather">
        <Text>We need this information to understand your needs and give you a better service, and in particular for the following reasons:</Text>
        <List
          items={[
            'To reply to your enquiry, share plot availability and pricing, and arrange a site visit.',
            'Internal record keeping.',
            'To improve this website and our services (only using analytics data when you have accepted cookies).',
            'To contact you about Oka Resorts, such as plot updates, offers or events, if you have enquired with us. You can ask us to stop at any time.',
          ]}
        />
        <Text>We do not sell your personal information. We share it only with our own team, with people who help us serve you (for example, staff arranging your site visit), or when the law requires it. Messages you send through WhatsApp or email also pass through those services, which have their own privacy policies.</Text>
      </Section>

      <Section title="Security">
        <Text>
          We are committed to ensuring that your information is secure. To prevent unauthorised access or disclosure we have put suitable
          technical and managerial measures in place to protect the information we collect. This website uses an encrypted (HTTPS) connection,
          and the area for managing website content is open only to authorised staff. No method of sending information over the internet is
          completely secure, so we cannot guarantee absolute security.
        </Text>
      </Section>

      <Section title="How we use cookies">
        <Text>
          A cookie is a small file that a website asks to place on your device. Once you agree, the file is added and the cookie helps
          analyse web traffic or lets a site recognise you when you return. Cookies allow a website to remember your preferences.
        </Text>
        <Text>This website uses the following:</Text>
        <List
          items={[
            'Cookie choice (always on): we remember whether you accepted or declined cookies, in your browser’s local storage, so we do not keep asking you. This is not used for tracking.',
            'Analytics cookies (only if you click Accept): we use Google Analytics 4 to count visitors and to see which pages and buttons are used. Cookies such as “_ga” are set by Google. We use this information only for statistics to improve the website. If you decline, Google Analytics is not loaded and these cookies are not set.',
            'Staff login (staff only): the area for managing gallery updates keeps a login session in the browser. Visitors do not use this.',
          ]}
        />
        <Text>Third-party content on this website, which we do not control:</Text>
        <List
          items={[
            'The 360° virtual tour is provided by Panoee (tour.panoee.net) and is shown inside our page. Panoee may use its own cookies or browser storage to run the tour, under its own policy.',
            'Some fonts are loaded from Google Fonts. Your browser connects to Google’s servers to download them, which shares your IP address with Google.',
          ]}
        />
        <Text>
          You can accept or decline cookies. You can change your choice at any time using <CookieSettingsButton /> in the footer, or by using your browser
          settings to block or delete cookies. Most web browsers accept cookies automatically, but you can usually change this setting.
          If you block all cookies, parts of the website, such as the 360° tour, may not work properly.
        </Text>
      </Section>

      <Section title="Links to other websites">
        <Text>
          Our website may contain links, for example to WhatsApp, Instagram and Google Maps, that let you visit other websites easily. Once you
          use these links to leave our site, please note that we have no control over that other website. We cannot be responsible for the
          protection and privacy of any information you give while visiting such sites, and they are not governed by this privacy statement.
          Please look at the privacy statement of the website in question.
        </Text>
      </Section>

      <Section title="Your choices and rights">
        <Text>
          You can ask us what information we hold about you, ask us to correct or delete it, or ask us to stop contacting you, at any time using
          the details below. You can also withdraw your cookie consent at any time, as described above.
        </Text>
      </Section>

      <Section title="Contact us">
        <Text>
          For any privacy question or request: Amitha Developers, Oka Resorts, Reddipalli, Padmanabham, Visakhapatnam. Phone / WhatsApp:{' '}
          <a href="tel:+918121744755">+91 81217 44755</a>. Email: <ObfuscatedEmail showAddress subject="Privacy request - Oka Resorts" />.
        </Text>
      </Section>
    </LegalPage>
  );
}