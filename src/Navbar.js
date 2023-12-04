export default function Navbar(){
return(
<nav className="w-screen max-w-full flex justify-center fixed px-8 pt-8 z-50">
    <div className="flex w-[100%] md:w-[90%] justify-between items-center px-5 py-3">
        <img alt="logo"></img>

        {/* MOBILE */}
        <button className=" md:hidden">
        </button>

        {/* DESKTOP */}
        <div className="hidden md:flex justify-end gap-10 items-center">
            <div to="/index">Experience</div>
            <div to="/index">Projects</div>
            <div to="/index">Contact Me</div>
        </div>
    </div>
</nav>
)
}