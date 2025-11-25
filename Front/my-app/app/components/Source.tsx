import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Earth } from "lucide-react"
import { useState } from "react";

export function Source({ onChange }: { onChange: (v: string) => void }) {
  const [source, setSource] = useState<string>("");

    function toggle(val: string) {
    const newVal = source === val ? "" : val;
    setSource(newVal);
    onChange(newVal);
    }

  return (
    <div className="flex flex-col items-start gap-5 border rounded-md m-10 p-5 w-130">
        <div className="flex items-center gap-2">
        <Earth />
        <h3 className="text-lg">Source</h3>
    </div>
      <ButtonGroup>
        <Button variant="outline" onClick={() => toggle("Semisynthesis")}
          className={source === "Semisynthesis" ? "bg-gray-100" : ""}>Semisynthesis</Button>

        <Button variant="outline" onClick={() => toggle("Natural")}
          className={source === "Natural" ? "bg-gray-100" : ""}>Natural</Button>

        <Button variant="outline" onClick={() => toggle("Biotransformation")}
          className={source === "Biotransformation" ? "bg-gray-100" : ""}>Biotransformation</Button>
      </ButtonGroup>
    </div>
  )
}
export default Source