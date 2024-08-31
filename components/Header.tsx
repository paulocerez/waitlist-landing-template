import { ModeToggle } from "./ui/modeToggle";

export default function Header() {
  return (
    <div className="hidden md:flex flex-row justify-end w-full">
      <ModeToggle />
    </div>
  );
}
