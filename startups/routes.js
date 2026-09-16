module.exports = function () {
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser())
    
    app.use("/api/user", userRoutes);
    app.use("/api/posts", postRoutes)
    app.use("/api/chats", chatRoutes)
    
    app.use((error, req, res, next)=>{
        console.log(error);
        logger.error(error.message,{
            method: req.method,
            path: req.originalUrl,
            stack: error.stack,
        });
        return res.status(500).json({message: "Internal Server Error!"})
    })
}