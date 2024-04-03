import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { UserState } from "../../../store/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const avatarInput = useRef<HTMLInputElement>(null);

  const { user } = useSelector((store: { user: UserState }) => store.user);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [oldAvatar, setOldAvatar] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userCheck = /^[a-z0-9_.-]{6,25}$/gim;

    if (!userCheck.test(username)) {
      toast.error("Invalid Username");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("username", username);
    formData.set("bio", bio);
    formData.set("email", email);
    if (avatar) {
      formData.set("avatar", avatar);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    setAvatar(null);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(e.target.files![0]);
    setAvatar(e.target.files![0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setBio(user.bio);
      setEmail(user.email);
      setOldAvatar(user.avatar);
    }
  }, [dispatch]);

  return (
    <>
      <form
        onSubmit={handleUpdate}
        encType="multipart/form-data"
        className="flex flex-col gap-4 py-4 px-4 sm:py-10 sm:px-24 sm:w-3/4"
      >
        <div className="flex items-center gap-8 ml-20">
          <div className="w-11 h-11">
            <img
              draggable="false"
              className="w-full h-full rounded-full border object-cover"
              src={avatarPreview ? avatarPreview : oldAvatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-xl">{username}</span>
            <label
              onClick={() => avatarInput.current?.click()}
              className="text-sm font-medium text-primary-blue cursor-pointer"
            >
              Change Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              ref={avatarInput}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Name</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Username</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                
                <div className="flex w-full gap-8 text-right items-start">
                    <span className="w-1/4 font-semibold">Bio</span>
                    <textarea
                        className="border rounded outline-none resize-none p-1 w-3/4"
                        name="bio"
                        placeholder="Bio"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required
                    >
                    </textarea>
                </div>
                <div className="flex w-full gap-8 text-right items-center">
                    <span className="w-1/4 font-semibold">Email</span>
                    <input
                        className="border rounded p-1 w-3/4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-primary-blue font-medium rounded-full bg-[#1D98F0] text-white py-2 w-40 mx-auto text-sm">Submit</button>
      </form>
    </>
  );
};

export default UpdateProfile;
