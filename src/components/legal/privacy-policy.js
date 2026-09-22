import React from 'react';

import LegalPage from './legal-page';

const CONTACT_FORM = 'https://goo.gl/forms/eOanpGEuglCYYg7u2';

export default function PrivacyPolicy() {
  return (
    <LegalPage titleId="misc.privacyPolicy" effectiveDate="September 22, 2026">
      <p>
        Sectors Without Number is a free, open source sector generator for the
        Stars Without Number tabletop role-playing game. This policy explains
        what information the site collects and how it is used.
      </p>

      <h3 className="LegalPage-Section">Information we collect</h3>
      <ul className="LegalPage-List">
        <li>
          <b>Account information.</b> If you create an account, we store the
          email address and display name you provide. If you sign in with
          Google, we receive the name and email address associated with your
          Google account. Passwords are handled by Firebase Authentication and
          are never visible to us.
        </li>
        <li>
          <b>Content you create.</b> Sectors, systems, planets, factions,
          layers, navigation routes, notes, and custom tags you save are stored
          in Google Cloud Firestore and associated with your account.
        </li>
        <li>
          <b>Preferences.</b> Your language preference is stored with your
          account. A copy of your current session, including unsaved generated
          sectors, is kept in your browser&apos;s local storage so it survives a
          page refresh.
        </li>
      </ul>
      <p>The site does not use analytics, advertising, or tracking cookies.</p>

      <h3 className="LegalPage-Section">How your information is used</h3>
      <p>
        Your information is used only to sign you in, keep your saved sectors
        associated with your account, and display those sectors to you and to
        anyone you share them with.
      </p>

      <h3 className="LegalPage-Section">Sharing</h3>
      <p>
        Any sector you save can be viewed by anyone who has its link. Do not
        store personal or sensitive information in your sectors. We do not sell
        your information. Data is stored and processed by Google Firebase
        (Authentication, Cloud Firestore, and Hosting), and fonts are loaded
        from Google Fonts, all of which are subject to Google&apos;s privacy
        policy.
      </p>

      <h3 className="LegalPage-Section">Deleting your data</h3>
      <p>
        You can delete any sector you have saved from within the site. To delete
        your account and all data associated with it,{' '}
        <a
          className="LegalPage-Link"
          href={CONTACT_FORM}
          target="_blank"
          rel="noopener noreferrer"
        >
          submit a request through this form
        </a>
        .
      </p>

      <h3 className="LegalPage-Section">Children</h3>
      <p>
        The site is not directed at children under 13, and we do not knowingly
        collect information from them.
      </p>

      <h3 className="LegalPage-Section">Changes to this policy</h3>
      <p>
        This policy may be updated from time to time. The effective date at the
        top of this page shows when it was last changed.
      </p>

      <h3 className="LegalPage-Section">Contact</h3>
      <p>
        Questions about this policy can be sent{' '}
        <a
          className="LegalPage-Link"
          href={CONTACT_FORM}
          target="_blank"
          rel="noopener noreferrer"
        >
          through this form
        </a>
        .
      </p>
    </LegalPage>
  );
}
