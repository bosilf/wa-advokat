'use client'

import Button from "@/components/buttons/Button"
import Link from "next/link"

const Footer = () => {
  return (
    <footer
      className="
        relative
        h-svh
        md:h-auto
        bg-footer
      "
    >
      <div
        className="
          h-svh
          bg-footer
          px-lg pt-16 pb-6
          flex flex-col justify-between
          md:h-auto
          md:min-h-150
        "
      >
        <nav className="grid grid-cols-2 gap-lg">
          <section className="flex flex-col gap-0.5">
            <h2 className="font-subheading text-white">
              Navigering
            </h2>

            <ul className="flex flex-col gap-2 font-body text-white">
              <li>
                <Link href="/rattsomraden">Rättsområden</Link>
              </li>

              <li>
                <Link href="/juridikkurser">Juridikkurser</Link>
              </li>

              <li>
                <Link href="/om-oss">Om oss</Link>
              </li>

              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-0.5">
            <h2 className="font-subheading text-white">
              Juridikkurser
            </h2>

            <ul className="flex flex-col gap-2 font-body text-white">
              <li>
                <Link href="/">
                  Entreprenadjuridik
                </Link>
              </li>

              <li>
                <Link href="/">
                  Offentlig upphandling
                </Link>
              </li>

              <li>
                <Button
                  href="/"
                  variant="simpleWhite"
                >
                  Boka kurs
                </Button>
              </li>
            </ul>
          </section>

          <section className="col-span-2 flex flex-col gap-2 text-white">
            <h2 className="font-subheading">
              Rättsområden
            </h2>

            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/">Avtalsrätt</Link>
              </li>

              <li>
                <Link href="/">
                  Entreprenadrätt och konsulträtt
                </Link>
              </li>

              <li>
                <Link href="/">
                  Offentlig upphandling
                </Link>
              </li>

              <li>
                <Link href="/">
                  Skadestånds- och försäkringsjuridik
                </Link>
              </li>

              <li>
                <Link href="/">
                  Tvistelösning
                </Link>
              </li>
            </ul>
          </section>
        </nav>

        <section className="flex flex-col items-end gap-3">
          <p className="text-right font-caption text-white">
            Telefonnummer
            <br />
            E-mail address
          </p>
        </section>

        <ul
          className="
            flex flex-wrap justify-end gap-3
            text-right font-caption text-xs text-white
          "
        >
          <li>© 2025 WA Advokatbyrå KB</li>
          <li>Org-nummer: 969776-0404</li>
          <li>Sibyllegatan 28, 114 43 Stockholm</li>
          <li>Om cookies</li>
          <li>WA integritetspolicy</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer