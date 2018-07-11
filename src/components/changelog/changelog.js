import React from 'react';
import dayjs from 'dayjs';

import StarBackground from 'components/star-background';
import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/container/content-container';
import FlexContainer from 'primitives/container/flex-container';

import changelog from 'changelog.json';

import './style.css';

export default function Changelog() {
  return (
    <StarBackground>
      <ContentContainer align="flexStart" justify="center">
        <FlexContainer direction="column">
          <Header className="Changelog-Header" type={HeaderType.header2}>
            Changelog
          </Header>
          {Object.keys(changelog)
            .map(version => ({
              ...changelog[version],
              version,
            }))
            .map(({ version, date, description, changes }) => (
              <FlexContainer
                className="Changelog-Item"
                key={version}
                direction="column"
                align="flexStart"
              >
                <Header type={HeaderType.header3} className="Changelog-Version">
                  {`v${version}`}
                  <span className="Changelog-Date">
                    ({dayjs(date).format('MMMM D, YYYY')})
                  </span>
                </Header>
                <span>
                  <b>Description:</b> {description}
                </span>
                {!changes || !changes.length ? null : (
                  <p className="Changelog-Updates">
                    <b>Updates:</b>
                  </p>
                )}
                <ul className="Changelog-List">
                  {changes &&
                    changes.map(change => (
                      <li className="Changelog-Change" key={change}>
                        {change}
                      </li>
                    ))}
                </ul>
              </FlexContainer>
            ))}
        </FlexContainer>
      </ContentContainer>
    </StarBackground>
  );
}
