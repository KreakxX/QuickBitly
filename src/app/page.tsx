import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiSpring,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiSelenium,
  SiHibernate,
  SiFastapi,
  SiTailwindcss,
  SiKeycloak,
  SiKeras,
  SiExpo,
  SiScikitlearn,
  SiTypescript,
  SiPython,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-400 to-blue-600">
      <div className="flex items-center justify-center">
        <h1 className="font-bold text-white text-3xl mt-20">QuickBitly</h1>
      </div>
    </div>
  );
}
