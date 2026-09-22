import React from 'react';

import LegalPage from './legal-page';

const GITHUB_REPO = 'https://github.com/mpigsley/sectors-without-number';
const CONTACT_FORM = 'https://goo.gl/forms/eOanpGEuglCYYg7u2';

export default function TermsOfService() {
  return (
    <LegalPage titleId="misc.termsOfService" effectiveDate="September 22, 2026">
      <p>
        By using Sectors Without Number you agree to these terms. If you do not
        agree, please do not use the site.
      </p>

      <h3 className="LegalPage-Section">The service</h3>
      <p>
        Sectors Without Number is a free, open source tool. The source code is
        available{' '}
        <a
          className="LegalPage-Link"
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
        >
          on GitHub
        </a>{' '}
        under the MIT License. Any part of the site may be changed or
        discontinued at any time.
      </p>

      <h3 className="LegalPage-Section">Your account</h3>
      <p>
        You are responsible for keeping your login credentials secure and for
        any activity that happens under your account.
      </p>

      <h3 className="LegalPage-Section">Your content</h3>
      <p>
        You own the sectors and other content you create. By saving content to
        the site you allow us to store it and display it to you and to anyone
        who has its link. You are responsible for your content and must have the
        rights to anything you add to the site.
      </p>

      <h3 className="LegalPage-Section">Acceptable use</h3>
      <p>
        Do not use the site for anything unlawful, do not add content that is
        abusive, infringing, or harmful, and do not attempt to disrupt the site,
        bypass its limits, or access other users&apos; accounts or data.
      </p>

      <h3 className="LegalPage-Section">Stars Without Number</h3>
      <p>
        Stars Without Number is a product of Sine Nomine Publishing. This site
        is an independent, fan-made tool and is not affiliated with or endorsed
        by Sine Nomine Publishing.
      </p>

      <h3 className="LegalPage-Section">No warranty</h3>
      <p>
        The site is provided &quot;as is&quot; without warranty of any kind. To
        the fullest extent permitted by law, we are not liable for any damages
        arising from your use of the site, including loss of data. Use the
        export feature to keep your own backups of anything important.
      </p>

      <h3 className="LegalPage-Section">Termination</h3>
      <p>
        Accounts or content that violate these terms may be suspended or
        removed.
      </p>

      <h3 className="LegalPage-Section">Changes to these terms</h3>
      <p>
        These terms may be updated from time to time. The effective date at the
        top of this page shows when they were last changed. Continuing to use
        the site after a change means you accept the updated terms.
      </p>

      <h3 className="LegalPage-Section">Contact</h3>
      <p>
        Questions about these terms can be sent{' '}
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
