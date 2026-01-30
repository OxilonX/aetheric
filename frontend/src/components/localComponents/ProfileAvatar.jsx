import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
export function ProfileAvatar() {
  const { user, logout, API_BASE_URL } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full">
          <Avatar className="w-8 h-8 cursor-pointer">
            {user?.profile_pic ? (
              <AvatarImage
                className={"w-full h-full "}
                src={
                  user?.profile_pic
                    ? `${API_BASE_URL}${user.profile_pic}`
                    : `${API_BASE_URL}/uploads/default_profile_pic.png`
                }
                alt={user?.username}
              />
            ) : null}
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-background "
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal ">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Personal Account
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="hover:bg-muted"
          onClick={() => navigate("/profile")}
        >
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-muted">Billing</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-red-600 ">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
