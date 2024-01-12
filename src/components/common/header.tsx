import ThemeToggle from "../ui/theme-toggle";
import DetailsDrawer from "./details-drawer";

export default function Header() {
  return (
    <header className="fixed w-full left-0 top-0 p-2.5 xs:p-4 flex justify-between items-center">
      <ThemeToggle />

      <DetailsDrawer />
    </header>
  );
}
