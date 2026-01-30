import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";
import api from "@/components/utilityComponents/authorizationTokenHandler";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router";

export default function Register() {
  const { API_BASE_URL, setAuth, getUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const validateFields = (data) => {
    return Object.values(data).every((value) => value.trim() !== "");
  };
  const handleRegister = async () => {
    if (!validateFields(registerData)) {
      return;
    }
    try {
      const _ = await api.post(
        `${API_BASE_URL}/api/users/register`,
        { data: registerData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setRegisterData({
        username: "",
        email: "",
        password: "",
      });
      setActiveTab(1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    if (!validateFields(loginData)) {
      return;
    }
    try {
      const res = await api.post(
        `${API_BASE_URL}/api/users/login`,
        { data: loginData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setLoginData({
        username: "",
        email: "",
        password: "",
      });
      const { user, accessToken } = res.data;

      if (user && accessToken) {
        setAuth(user, accessToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-start pt-20 justify-center self-start">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="cursor-pointer rounded-sm" value={0}>
            Register
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer rounded-sm" value={1}>
            Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <Card shadow="lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="pb-1" htmlFor="username">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={registerData.username}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="pb-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="pb-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full capitalize text-background dark:bg-accent py-6 rounded-md cursor-pointer"
                onClick={handleRegister}
              >
                Sign up now
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value={1}>
          <Card shadow="lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Log in to your account to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label className="pb-2" htmlFor="login-email">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="m@example.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label className="pb-2" htmlFor="login-password">
                  Password
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full capitalize text-background dark:bg-accent py-6 rounded-md cursor-pointer"
                onClick={handleLogin}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
