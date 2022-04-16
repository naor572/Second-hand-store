import About from "../../pages/About/About";
import AuthForm from "../../pages/Auth/AuthForm";
import Home from "../../pages/Home/Home";
import MyItems from "../../pages/MyItems/MyItems";
import CreatePost from "../../pages/NewItem/CreatePost";
import DeletePost from "../../pages/DeletePost";
import PostDetails from "../postDeatils/PostDetails";
const linksData = [
  {
    path: "/About",
    component: About,
    name: "About",
  },
  {
    path: "/",
    component: AuthForm,
    name: "FormAuth",
  },
  {
    path: "/Home",
    component: Home,
    name: "Home",
  },
  {
    path: "/MyItems",
    component: MyItems,
    name: "MyItems",
  },
  {
    path: "/EditPost/:itemId",
    component: CreatePost,
    name: "EditPost",
  },
  {
    path: "/CreatePost",
    component: CreatePost,
    name: "CreatePost",
  },
  {
    path: "/DeleteMyItem/:itemId",
    component: DeletePost,
    name: "DeletePost",
  },
  {
    path: "/PostDetails/:itemId",
    component: PostDetails,
    name: "PostDetails",
  },
];

export default linksData;
