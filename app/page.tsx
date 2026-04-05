import GradientMesh from "@/components/GradientMesh";
import BentoCard from "@/components/BentoCard";
import HeroCard from "@/components/HeroCard";
import ShayariCard from "@/components/ShayariCard";
import SongPlayer from "@/components/SongPlayer";
import Polaroid from "@/components/Polaroid";
import PhotoCarousel from "@/components/PhotoCarousel";
import Link from "next/link";
import Image from "next/image";
import { fetchPublishedPosts, fetchNowPage } from "@/lib/notion";

export const revalidate = 60;

const sportsPhotos = [
  { src: "/images/photos/tennis.jpg", alt: "Sarvesh playing tennis", caption: "Tennis, my happy place" },
  { src: "/images/photos/cricket.jpg", alt: "Sarvesh at IPL match", caption: "Cricket, RCB forever" },
  { src: "/images/photos/tennis-duo.jpg", alt: "Sarvesh with tennis partner", caption: "Post match smiles" },
];

const shayaris = [
  {
    text: "बेसब्र, बेखबर, बेइंतहां यू ही चलता जा रहा।\nकुछ पाने की आस लिए यू ही भटकता जा रहा।।",
    audio: "/audio/shayari-1.mp3",
  },
  {
    text: "उस हरकत-ए-शाम में तुम भी मत खो जाना\nउस मंज़र-ए-वतन में तुम भी मत भूल जाना",
    audio: "/audio/shayari-2.mp3",
  },
  {
    text: "उनके ईमान पर अर्ज़ करने की अब फ़ुर्सत नहीं है\nउनकी फ़ितरतों पर इशारा करने का अब खर्च नहीं है",
    audio: "/audio/shayari-3.mp3",
  },
];

export default async function HomePage() {
  let latestPost: { title: string; slug: string; excerpt: string } | null = null;
  try {
    const posts = await fetchPublishedPosts();
    if (posts.length > 0) {
      latestPost = {
        title: posts[0].title,
        slug: posts[0].slug,
        excerpt: posts[0].excerpt || "",
      };
    }
  } catch {
    // Notion not configured
  }

  let nowSnippet = "What I'm up to right now...";
  try {
    const nowData = await fetchNowPage();
    if (nowData) {
      const plainText = nowData.contentHtml.replace(/<[^>]+>/g, "");
      nowSnippet = plainText.slice(0, 100) + (plainText.length > 100 ? "..." : "");
    }
  } catch {
    // Notion not configured
  }

  const randomShayari = shayaris[Math.floor(Math.random() * shayaris.length)];
  const randomSport = sportsPhotos[Math.floor(Math.random() * sportsPhotos.length)];

  return (
    <>
      <GradientMesh />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Row 1: Hero */}
        <div className="mb-5">
          <BentoCard index={0}>
            <HeroCard />
          </BentoCard>
        </div>

        {/* Row 2: Latest Post + Shayari + Now */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <BentoCard index={1} className="md:col-span-1">
            <Link href={latestPost ? `/blog/${latestPost.slug}` : "/blog"} className="block h-full p-6">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-2">Latest Post</p>
              <h3 className="font-heading text-lg text-secondary mb-2">
                {latestPost ? latestPost.title : "Coming soon..."}
              </h3>
              <p className="text-sm text-text/60 line-clamp-3">
                {latestPost ? latestPost.excerpt : "Blog posts powered by Notion. Check back soon."}
              </p>
            </Link>
          </BentoCard>

          <BentoCard index={2} className="md:col-span-1">
            <div className="h-full p-5 flex flex-col items-center justify-center">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3">Shayari</p>
              <ShayariCard text={randomShayari.text} audioSrc={randomShayari.audio} rotation={0} />
            </div>
          </BentoCard>

          <BentoCard index={3} className="md:col-span-1">
            <Link href="/now" className="block h-full p-6">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-2">Now</p>
              <p className="text-sm text-text/70 leading-relaxed">{nowSnippet}</p>
            </Link>
          </BentoCard>
        </div>

        {/* Row 3: Song + Sports + Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <BentoCard index={4} className="md:col-span-1">
            <div className="h-full p-6 flex items-center">
              <SongPlayer compact />
            </div>
          </BentoCard>

          <BentoCard index={5} className="md:col-span-1">
            <div className="h-full p-5 flex items-center justify-center">
              <Polaroid
                src={randomSport.src}
                alt={randomSport.alt}
                caption={randomSport.caption}
                rotation={-2}
              />
            </div>
          </BentoCard>

          <BentoCard index={6} className="md:col-span-1">
            <div className="h-full p-6 flex flex-col justify-center items-center text-center">
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-4">Connect</p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/sarvesh-khimesra/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
                </a>
                <a href="https://www.instagram.com/sarveshrf/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Image src="/icons/instagram.svg" alt="Instagram" width={20} height={20} />
                </a>
                <a href="https://x.com/SKhimesra" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Image src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
                </a>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Row 4: Ireland Photo Carousel (full width) */}
        <BentoCard index={7}>
          <div className="p-4">
            <p className="text-xs font-mono text-primary uppercase tracking-wider mb-3 px-2">Ireland Postcards</p>
            <PhotoCarousel />
          </div>
        </BentoCard>
      </div>
    </>
  );
}
