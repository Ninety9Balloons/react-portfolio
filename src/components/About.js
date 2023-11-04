import { useEffect, useState } from "react";
import { client } from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const builder = imageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

export default function About() {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        client
            .fetch(
                `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`
            )
            .then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, []);

    if (!author) return <div>Loading...</div>;

    return (
        <main className="relative ">
            <img
                src="https://images.unsplash.com/photo-1528844433838-6115c9c13a14?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="background"
                className="absolute w-full h-full object-cover"
            />
            <div className="p-10 lg:pt-48 container mx-auto relative">
                <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
                    <img
                        src={urlFor(author.authorImage).url()}
                        alt={author.name}
                        className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
                    />
                    <div className="text-lg flex flex-col justify-center">
                        <h1 className="cursive text-6xl text-green-300 mb-4">
                            Hey there. I'm{" "}
                            <span className="text-green-100">
                                {author.name}
                            </span>
                        </h1>
                        <div className="prose lg:prose-xl text-white">
                            <BlockContent
                                blocks={author.bio}
                                projectId="eb0pdclv"
                                dataset="production"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
