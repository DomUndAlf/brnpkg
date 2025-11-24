import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Earth } from "lucide-react"

export function Source() {
  return (
    <div className="flex flex-col items-start gap-8 border rounded-md m-10 p-5 w-130">
        <div className="flex items-center gap-2">
        <Earth />
        <h3 className="text-lg">Source</h3>
    </div>
      <ButtonGroup>
        <Button variant="outline">Semisynthesis</Button>
        <Button variant="outline">Natural</Button>
        <Button variant="outline">Biotransformation</Button>
      </ButtonGroup>
      
    </div>
  )
}
export default Source