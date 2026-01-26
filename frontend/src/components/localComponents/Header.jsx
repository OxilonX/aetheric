import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Header() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };
  return (
    <>
      <header className="container w-[80%] flex items-center justify-between bg-card py-4 px-6 my-3 mx-auto rounded-full">
        <div></div>
        <nav>
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview">home</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
        <div>
          <Button
            onClick={() => {
              toggleTheme();
            }}
          >
            Theme
          </Button>
        </div>
      </header>
    </>
  );
}
