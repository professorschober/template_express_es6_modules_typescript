// src/app.ts
import createError from "http-errors";
import express, {
    type Request,
    type Response,
    type NextFunction,
} from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(process.cwd(), "views"));
app.use(express.static(path.join(process.cwd(), "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/info", (_req: Request, res: Response) => {
    res.json({
        name: "Movies API",
        version: "1.0.0"
        // moviesCount: movies.length,
    });
});

// catch 404 and forward to error handler
app.use((req: Request, _res: Response, next: NextFunction) => {
    next(createError(404));
});

// error handler
app.use(
    (
        err: createError.HttpError,
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    }
);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;