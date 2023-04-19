import Button from "@/web/components/Button"
import Link from "next/link"

const Safe = (props) => {
  const { session } = props

  return (
    <div className="grid grid-cols-1 gap-4 bg-neutral-100 p-4 rounded-lg shadow-lg shadow-indigo-500">
      <p>Salut {session.userUsername}, nous sommes content de te revoir.</p>

      <div className="flex w-full gap-2">
        <Button>Générer un mot de passe</Button>
        <Link href="/addPassword">
          <Button>Ajouter un mot de passe</Button>
        </Link>
      </div>
    </div>
  )
}

export default Safe
