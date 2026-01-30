import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContextProvider";
import api from "@/components/utilityComponents/authorizationTokenHandler";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const { user, API_BASE_URL, setUser, loading } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  const [isEditing, setIsEditing] = useState({ username: false, email: false });
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const userDataHandleOnLoad = (user) => {
    try {
      setFormData({
        username: user.username || "",
        email: user.email || "nnn",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) userDataHandleOnLoad(user);
  }, [user]);
  const [isDirty, setIsDirty] = useState(false);

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const toggleEdit = (field, ref) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    if (!isEditing[field]) {
      setTimeout(() => ref.current?.focus(), 0);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) editProfilePicReq(file);
  };

  const editProfilePicReq = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await api.post(
        `${API_BASE_URL}/api/users/pfp`,
        formData,
      );
      if (response.data.url)
        setUser((prev) => ({ ...prev, profile_pic: response.data.url }));
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveChangesClick = async () => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/api/users/update`,
        formData,
      );
      const newUser = response.data;
      if (newUser) setUser((prev) => ({ ...prev, ...newUser }));

      setIsDirty(false);
      setIsEditing({ username: false, email: false });
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please log in.
      </div>
    );
  }
  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-sm  p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        </div>

        <div className="flex items-center gap-6 p-6 bg-background rounded-xl   mb-10">
          <div className="relative group/avatar">
            <Avatar className="w-24 h-24 border-4 shadow-sm cursor-pointer overflow-hidden rounded-full">
              <AvatarImage
                className="object-cover w-full h-full"
                src={
                  user?.profile_pic
                    ? `${API_BASE_URL}${user.profile_pic}`
                    : `${API_BASE_URL}/uploads/default_profile_pic.png`
                }
              />
              <AvatarFallback className="text-2xl">
                {user?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all rounded-full cursor-pointer"
            >
              <Pencil
                className="text-background dark:text-foreground cursor-pointer"
                size={24}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Hi, {user?.username}
            </h2>
            <p className="text-muted-foreground">Member since {joinDate}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Username Input */}
          <div className="space-y-2">
            <Label className="text-muted font-medium">Username</Label>
            <div className="relative group">
              <Input
                name="username"
                ref={usernameRef}
                value={formData.username}
                onChange={handleInputChange}
                readOnly={!isEditing.username}
                className={`pr-10 py-6 text-md transition-all ${!isEditing.username ? "bg-slate-50 border-transparent cursor-default" : "bg-white border-primary shadow-sm"}`}
              />
              <button
                onClick={() => toggleEdit("username", usernameRef)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-primary transition-colors"
              >
                {isEditing.username ? (
                  <Check className="cursor-pointer" size={18} />
                ) : (
                  <Pencil className="cursor-pointer" size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted font-medium">Email Address</Label>
            <div className="relative group">
              <Input
                name="email"
                ref={emailRef}
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditing.email}
                className={`pr-10 py-6 text-md transition-all ${!isEditing.email ? "bg-slate-50 border-transparent cursor-default" : "bg-white border-primary shadow-sm"}`}
              />
              <button
                onClick={() => toggleEdit("email", emailRef)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {isEditing.email ? (
                  <Check className="cursor-pointer" size={18} />
                ) : (
                  <Pencil className="cursor-pointer" size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted font-medium">Joined Us In</Label>
            <div className="relative">
              <Input
                value={joinDate}
                readOnly
                className="bg-slate-50 border-transparent py-6 text-md text-slate-500 cursor-not-allowed"
              />
              <Calendar
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-muted-foreground flex justify-end">
          <Button
            onClick={handleSaveChangesClick}
            disabled={!isDirty}
            className=" cursor-pointer px-10 py-6 rounded-lg text-md font-semibold transition-all disabled:opacity-50"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
