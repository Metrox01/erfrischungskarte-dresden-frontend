import { Accordion } from '@components/Accordion'
import {
  ABOUT_ACCORDION_ITEMS,
  ABOUT_CONTACT_TEXT,
  ABOUT_INTRODUCTION_TEXT,
} from '@modules/RefreshmentMap/content'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Über das Projekt',
    query,
  },
})

const focusStyles =
  'focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:rounded-sm focus:ring-offset-gray-100'
export const About: FC = () => (
  <div>
    <p className="text-gray-500 text-sm pb-6">{ABOUT_INTRODUCTION_TEXT}</p>
    <Accordion items={ABOUT_ACCORDION_ITEMS} />
    <p className="text-gray-500 text-sm pt-6">{ABOUT_CONTACT_TEXT}</p>
    <section className="mt-16">
      <p className="text-sm text-gray-500">
        Diese Anwendung basiert auf der{' '}
        <a
          href="https://github.com/technologiestiftung/erfrischungskarte-frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 underline"
        >
          Berliner Erfrischungskarte
        </a>
        , einem Open-Source-Projekt der Technologiestiftung Berlin / ODIS,
        durchgeführt in Zusammenarbeit mit dem CityLAB Berlin.
      </p>
    </section>
    <footer
      className={classNames(
        'mt-8 bg-gray-100 p-8 -ml-6 -mb-6 sm:-ml-8 sm:-mb-8',
        'flex flex-wrap'
      )}
      style={{
        width: 'var(--sidebarWidth, 320px)',
      }}
    >
      <span className="text-xs w-full mb-4">
        Dresdner Erfrischungskarte — basierend auf einem Projekt der
        Technologiestiftung Berlin
      </span>
      <a
        href="https://github.com/technologiestiftung/erfrischungskarte-frontend"
        className={`text-xs hover:underline ${focusStyles} mr-4`}
        target="_blank"
        rel="noreferrer"
      >
        Originalprojekt auf GitHub
      </a>
    </footer>
  </div>
)

export default About
