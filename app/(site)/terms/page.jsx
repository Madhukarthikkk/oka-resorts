import LegalPage, { Section, Text, List } from '@/components/LegalPage';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export const metadata = {
  title: 'Terms & Conditions — Oka Resorts, Reddipalli, Visakhapatnam',
  description:
    'Terms and conditions for using the Oka Resorts website and for information about the Oka Resorts plotted development by Amitha Developers.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & Conditions"
      title="Terms for using Oka Resorts"
      updated="15 October 2026"
      intro="Please read these terms before using this website or relying on the information on it. By using the website you agree to them."
    >
      <Section title="1. About this website">
        <Text>
          This website is owned and operated by Amitha Developers (&ldquo;we&rdquo;, &ldquo;us&rdquo;) and gives information about Oka Resorts,
          a plotted development at Reddipalli, Padmanabham, Visakhapatnam.
        </Text>
      </Section>

      <Section title="2. Information is for general guidance only">
        <Text>
          Everything on this website, including plot sizes, prices, layouts, amenities, distances, photographs, videos and the 360&deg; tour,
          is for general information. It is not an offer, a promise or a contract, and it may change without notice.
        </Text>
      </Section>

      <Section title="3. Plans, images and amenities">
        <List
          items={[
            'Layout plans, plot numbers, plot sizes, road widths and amenities may change if required by the approving authorities or for planning reasons.',
            'Pictures, drawings, maps and 360\u00b0 views may be artist\u2019s impressions or sample images. What is finally built or delivered may look different.',
            'Distances and travel times are approximate.',
          ]}
        />
      </Section>

      <Section title="4. Availability, price and booking">
        <List
          items={[
            'Plot availability and prices can change and are confirmed only in writing by us.',
            'A plot is not reserved for you until you have paid a booking amount and received an official written receipt or agreement from us.',
            'Nothing on this website creates a binding agreement to sell a plot to you.',
          ]}
        />
      </Section>

      <Section title="5. Payments">
        <Text>
          Please make payments only to the official bank account of the company and only against an official receipt. Do not pay cash to any
          person without a proper receipt. If you are unsure whether a request for payment is genuine, contact us on the number below first.
        </Text>
      </Section>

      <Section title="6. Cancellation and refund">
        <Text>
          Booking amounts, cancellation charges and refund timelines are set out in the written agreement signed with you, not on this website.
        </Text>
      </Section>

      <Section title="7. Taxes and other charges">
        <Text>
          Registration charges, stamp duty, taxes, maintenance and any other government or society charges are in addition to the plot price,
          as required by law, unless we confirm otherwise in writing.
        </Text>
      </Section>

      <Section title="8. Please verify before you buy">
        <Text>
          We encourage every buyer to ask for and check the project documents, approvals and title papers, and to take advice from their own
          advocate or advisor, before booking a plot.
        </Text>
      </Section>

      <Section title="9. Use of the website and our content">
        <Text>
          The logos, text, photographs, videos, plans and 360&deg; tour on this website belong to Amitha Developers or are used with permission.
          You may not copy, sell or reuse them without our written permission. Please do not misuse the website, try to break into it,
          or use it in any way that is unlawful.
        </Text>
      </Section>

      <Section title="10. No guarantee, and limit of responsibility">
        <Text>
          We try to keep this website correct and up to date, but we do not promise that it is complete, error-free or always available.
          The website is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not responsible for any loss caused by relying only on the
          content of this website. Please confirm important details with us directly.
        </Text>
      </Section>

      <Section title="11. Links and third-party services">
        <Text>
          This website links to or uses services run by others, such as WhatsApp, Instagram and the provider of the 360&deg; tour. They have their
          own terms and privacy practices, and we are not responsible for them.
        </Text>
      </Section>

      <Section title="12. Privacy and cookies">
        <Text>
          How we handle your personal information and the cookies on this website is explained on our{' '}
          <a href="/privacy-and-cookies">Privacy &amp; Cookies</a> page. By using this website you agree to it.
        </Text>
      </Section>

      <Section title="13. Governing law">
        <Text>
          These terms are governed by the laws of India. Any dispute about them will be subject to the courts at Visakhapatnam, Andhra Pradesh.
        </Text>
      </Section>

      <Section title="14. Changes to these terms">
        <Text>
          We may update these terms from time to time. The version on this page, with its &ldquo;last updated&rdquo; date, is the one that applies.
        </Text>
      </Section>

      <Section title="15. Contact us">
        <Text>
          Amitha Developers, Oka Resorts, Reddipalli, Padmanabham, Visakhapatnam. Phone / WhatsApp: <a href="tel:+918121744755">+91 81217 44755</a>. Email:{' '}
          <ObfuscatedEmail showAddress subject="Oka Resorts Enquiry" />.
        </Text>
      </Section>
    </LegalPage>
  );
}