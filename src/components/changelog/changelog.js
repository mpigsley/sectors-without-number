import React from 'react';

import Header, { HeaderType } from 'primitives/text/header';
import ContentContainer from 'primitives/containers/content-container';
import FlexContainer from 'primitives/containers/flex-container';

import changelog from 'changelog.json';

import './style.css';

export default function Changelog() {
  return (
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
          .map(({ version, description, changes }) => (
            <FlexContainer
              className="Changelog-Item"
              key={version}
              noMargin
              direction="column"
              align="flexStart"
            >
              <Header type={HeaderType.header3}>{`v${version}`}</Header>
              <span>
                <b>Description:</b> {description}
              </span>
              {!changes || !changes.length ? null : (
                <p className="Changelog-Updates">
                  <b>Updates:</b>
                </p>
              )}
              <ul>
                {changes &&
                  changes.map(change => <li key={change}>{change}</li>)}
              </ul>
            </FlexContainer>
          ))}
      </FlexContainer>
    </ContentContainer>
  );
}
