import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://jamesg.app', label: 'jamesg.app' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: left;
      }
      ul {
        justify-content: left;
        display: flex;
        padding-inline-start: 0px !important;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #627AFE;
        text-decoration: none;
        font-size: 20px;
      }

      @media screen and (max-width: 600px) {
        ul {
          display: block;
          padding: 50px;
        }
      }
    `}</style>
  </nav>
)

export default Nav
