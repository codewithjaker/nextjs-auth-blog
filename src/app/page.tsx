// // app/page.tsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
// import {
//   TrendingUp,
//   Users,
//   MapPin,
//   Award,
//   Globe,
//   ShoppingBag,
//   Truck,
//   ShieldCheck,
//   Building2,
// } from "lucide-react";

// export default function HomePage() {
//   return (
//     <div className="space-y-10">
//       {/* Hero Section */}
//       <Card className="p-0 shadow-xl overflow-hidden">
//         <div className="md:flex">
//           {/* Left Column - Founder Profile */}
//           <div className="md:w-2/5 bg-gradient-to-br from-primary to-primary/90 p-8 md:p-12 flex flex-col items-center justify-center relative">
//             <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat" />
            
//             <div className="relative z-10 text-center text-white">
//               <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full border-4 border-secondary/50 overflow-hidden bg-white/10 backdrop-blur-sm shadow-2xl">
//                 {/* Founder Image - Placeholder, replace with actual image */}
//                 <Image
//                   src="/founder.jpg" // Replace with your actual image path
//                   alt="Mohammod Showkat - Founder & Chairman"
//                   fill
//                   className="object-cover"
//                   priority
//                   sizes="(max-width: 768px) 160px, 192px"
//                 />
//                 {/* Verified badge */}
//                 <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
//                   <Building2 className="h-4 w-4 text-white" />
//                 </div>
//               </div>
              
//               <h1 className="text-2xl font-bold mt-6">Mohammod Showkat</h1>
//               <p className="text-lg mt-1 opacity-90">Founder & Chairman</p>
              
//               <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 <Badge variant="secondary" className="text-sm px-3 py-1">
//                   <TrendingUp className="h-3 w-3 mr-1 inline" />
//                   12+ Years
//                 </Badge>
//                 <Badge variant="secondary" className="text-sm px-3 py-1">
//                   <Globe className="h-3 w-3 mr-1 inline" />
//                   UAE Based
//                 </Badge>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Business Info */}
//           <CardContent className="md:w-3/5 p-8 md:p-12">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <span className="text-2xl font-bold text-primary">MZ</span>
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold text-primary">
//                   Mustaqbal Zamzam Group
//                 </h2>
//                 <p className="text-xl text-muted-foreground mt-1">
//                   Electronics Trading & Distribution
//                 </p>
//               </div>
//             </div>

//             <div className="mt-6 space-y-6">
//               <p className="text-lg leading-relaxed">
//                 With over <strong className="text-primary">$240 million</strong> in annual gross sales, 
//                 we are the premier choice for electronics wholesale and retail across the UAE and GCC region. 
//                 Established in 2012, our group serves 50,000+ business clients through 5+ strategic branches.
//               </p>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
//                   <div className="text-2xl font-bold text-primary">12+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Years</div>
//                 </div>
//                 <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
//                   <div className="text-2xl font-bold text-primary">50K+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Clients</div>
//                 </div>
//                 <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
//                   <div className="text-2xl font-bold text-primary">5+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Branches</div>
//                 </div>
//                 <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
//                   <div className="text-2xl font-bold text-primary">50+</div>
//                   <div className="text-xs text-muted-foreground mt-1">Team</div>
//                 </div>
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-4 mt-8">
//               <Button size="lg" className="bg-primary hover:bg-primary/90 px-6">
//                 <ShoppingBag className="mr-2 h-4 w-4" />
//                 Business Partnership
//               </Button>
//               <Button size="lg" variant="outline" className="px-6">
//                 <Globe className="mr-2 h-4 w-4" />
//                 View Companies
//               </Button>
//             </div>
//           </CardContent>
//         </div>
//       </Card>

//       {/* Expertise Tabs */}
//       <Tabs defaultValue="expertise" className="w-full">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="expertise" >
//             <ShoppingBag className="h-4 w-4 mr-2" />
//             Expertise
//           </TabsTrigger>
//           <TabsTrigger value="presence" >
//             <MapPin className="h-4 w-4 mr-2" />
//             Market Presence
//           </TabsTrigger>
//           <TabsTrigger value="values">
//             <Award className="h-4 w-4 mr-2" />
//             Core Values
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="expertise" className="space-y-4 mt-6">
//           <div className="grid md:grid-cols-3 gap-6">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <ShoppingBag className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">Electronics Trading</h3>
//                 <p className="text-muted-foreground">
//                   Bulk supply of smartphones, accessories, and consumer electronics with competitive pricing.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <Truck className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">Import & Export</h3>
//                 <p className="text-muted-foreground">
//                   Global logistics, customs clearance, and supply chain management across GCC.
//                 </p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
//                   <ShieldCheck className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">Quality Assurance</h3>
//                 <p className="text-muted-foreground">
//                   Certified products, warranty support, and professional after-sales service.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="presence" className="mt-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                   <MapPin className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg mb-2">Strategic Locations</h3>
//                   <p className="text-muted-foreground mb-4">
//                     Our network spans across key UAE locations, ensuring efficient service delivery.
//                   </p>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                     <div className="text-center p-3 bg-muted/30 rounded-lg">
//                       <div className="font-bold text-primary">Dubai</div>
//                       <div className="text-xs text-muted-foreground">HQ</div>
//                     </div>
//                     <div className="text-center p-3 bg-muted/30 rounded-lg">
//                       <div className="font-bold text-primary">Sharjah</div>
//                       <div className="text-xs text-muted-foreground">Warehouse</div>
//                     </div>
//                     <div className="text-center p-3 bg-muted/30 rounded-lg">
//                       <div className="font-bold text-primary">RAK</div>
//                       <div className="text-xs text-muted-foreground">Distribution</div>
//                     </div>
//                     <div className="text-center p-3 bg-muted/30 rounded-lg">
//                       <div className="font-bold text-primary">Ajman</div>
//                       <div className="text-xs text-muted-foreground">Retail</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="values" className="mt-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//                   <Award className="h-6 w-6 text-primary" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg mb-4">Our Business Philosophy</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
//                       <div>
//                         <h4 className="font-medium">Trust & Reliability</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Building lasting relationships through transparent business practices.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
//                       <div>
//                         <h4 className="font-medium">Ethical Standards</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Conducting business with integrity, rooted in Islamic values.
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
//                       <div>
//                         <h4 className="font-medium">Client Success</h4>
//                         <p className="text-sm text-muted-foreground">
//                           Committed to the success of every client through exceptional service.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Trust Indicators */}
//       <Card className="border-0 shadow-lg">
//         <CardContent className="p-8">
//           <h3 className="text-2xl font-bold text-center mb-8">Why Partner With Us</h3>
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                 <TrendingUp className="h-8 w-8 text-primary" />
//               </div>
//               <h4 className="font-bold">Proven Track Record</h4>
//               <p className="text-sm text-muted-foreground mt-1">12+ years of excellence</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                 <Users className="h-8 w-8 text-primary" />
//               </div>
//               <h4 className="font-bold">50,000+ Clients</h4>
//               <p className="text-sm text-muted-foreground mt-1">Trusted across GCC</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                 <ShieldCheck className="h-8 w-8 text-primary" />
//               </div>
//               <h4 className="font-bold">Certified Quality</h4>
//               <p className="text-sm text-muted-foreground mt-1">Authorized dealer</p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                 <Globe className="h-8 w-8 text-primary" />
//               </div>
//               <h4 className="font-bold">GCC Coverage</h4>
//               <p className="text-sm text-muted-foreground mt-1">5+ strategic locations</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// app/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  TrendingUp,
  Users,
  MapPin,
  Award,
  Globe,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Building2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  HeartHandshake,
  Trophy,
  Star,
  Medal,
  Briefcase,
  Phone,
  Mail,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Card className="p-0 shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left Column - Founder Profile */}
          <div className="md:w-2/5 bg-gradient-to-br from-primary to-primary/90 p-8 md:p-12 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat" />
            
            <div className="relative z-10 text-center text-white">
              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full border-4 border-secondary/50 overflow-hidden bg-white/10 backdrop-blur-sm shadow-2xl">
                {/* Founder Image - Placeholder, replace with actual image */}
                <Image
                  src="/founder.jpg"
                  alt="Mohammod Showkat - Founder & Chairman"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 160px, 192px"
                />
                {/* Verified badge */}
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold mt-6">Mohammod Showkat</h1>
              <p className="text-lg mt-1 opacity-90">Founder & Chairman</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <TrendingUp className="h-3 w-3 mr-1 inline" />
                  12+ Years
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Globe className="h-3 w-3 mr-1 inline" />
                  UAE Based
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column - Business Info */}
          <CardContent className="md:w-3/5 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">MZ</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary">
                  Mustaqbal Zamzam Group
                </h2>
                <p className="text-xl text-muted-foreground mt-1">
                  Electronics Trading & Distribution
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <p className="text-lg leading-relaxed">
                With over <strong className="text-primary">$240 million</strong> in annual gross sales, 
                we are the premier choice for electronics wholesale and retail across the UAE and GCC region. 
                Established in 2012, our group serves 50,000+ business clients through 5+ strategic branches.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
                  <div className="text-2xl font-bold text-primary">12+</div>
                  <div className="text-xs text-muted-foreground mt-1">Years</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-xs text-muted-foreground mt-1">Clients</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground mt-1">Branches</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-muted-foreground mt-1">Team</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-6">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Business Partnership
              </Button>
              <Button size="lg" variant="outline" className="px-6">
                <Globe className="mr-2 h-4 w-4" />
                View Companies
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Group Companies Overview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Our Group Companies</h2>
          <Button variant="ghost" asChild>
            <a href="/business-group" className="gap-2">
              View All <Building2 className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Mustaqbal Zamzam Mobile Trading LLC",
              location: "Dubai, Deira",
              focus: "Wholesale Electronics",
            },
            {
              name: "Zamzam Electronics Distribution FZE",
              location: "Sharjah",
              focus: "Import & Export",
            },
            {
              name: "Mustaqbal Accessories Trading",
              location: "Bur Dubai",
              focus: "Mobile Accessories",
            },
            {
              name: "Zamzam Retail Management",
              location: "Ras Al Khaimah",
              focus: "Retail Operations",
            },
          ].map((company, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-base line-clamp-2">{company.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{company.location}</span>
                </div>
                <Badge variant="outline" className="mt-3 text-xs">
                  {company.focus}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expertise Tabs */}
      <Tabs defaultValue="expertise" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expertise">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Expertise
          </TabsTrigger>
          <TabsTrigger value="presence">
            <MapPin className="h-4 w-4 mr-2" />
            Market Presence
          </TabsTrigger>
          <TabsTrigger value="values">
            <Award className="h-4 w-4 mr-2" />
            Core Values
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expertise" className="space-y-4 mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Electronics Trading</h3>
                <p className="text-muted-foreground">
                  Bulk supply of smartphones, accessories, and consumer electronics with competitive pricing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Import & Export</h3>
                <p className="text-muted-foreground">
                  Global logistics, customs clearance, and supply chain management across GCC.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Certified products, warranty support, and professional after-sales service.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="presence" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Strategic Locations</h3>
                  <p className="text-muted-foreground mb-4">
                    Our network spans across key UAE locations, ensuring efficient service delivery.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-primary">Dubai</div>
                      <div className="text-xs text-muted-foreground">HQ</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-primary">Sharjah</div>
                      <div className="text-xs text-muted-foreground">Warehouse</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-primary">RAK</div>
                      <div className="text-xs text-muted-foreground">Distribution</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="font-bold text-primary">Ajman</div>
                      <div className="text-xs text-muted-foreground">Retail</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-4">Our Business Philosophy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <h4 className="font-medium">Trust & Reliability</h4>
                        <p className="text-sm text-muted-foreground">
                          Building lasting relationships through transparent business practices.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <h4 className="font-medium">Ethical Standards</h4>
                        <p className="text-sm text-muted-foreground">
                          Conducting business with integrity, rooted in Islamic values.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <h4 className="font-medium">Client Success</h4>
                        <p className="text-sm text-muted-foreground">
                          Committed to the success of every client through exceptional service.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Digital Influence & Social Proof */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Digital Influence & Media</h2>
          <Button variant="ghost" asChild>
            <a href="/media" className="gap-2">
              View All <Globe className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-3">
                <Facebook className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">862k+</div>
              <p className="text-sm text-muted-foreground">Facebook Followers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-pink-600/10 flex items-center justify-center mx-auto mb-3">
                <Instagram className="h-6 w-6 text-pink-600" />
              </div>
              <div className="text-2xl font-bold">405k</div>
              <p className="text-sm text-muted-foreground">Instagram Followers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04.1z" />
                </svg>
              </div>
              <div className="text-2xl font-bold">213k+</div>
              <p className="text-sm text-muted-foreground">TikTok Followers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-3">
                <Youtube className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold">43k+</div>
              <p className="text-sm text-muted-foreground">YouTube Subscribers</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gulf Business</p>
                <p className="font-medium">Featured as Top Electronics Trader 2024</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dubai One</p>
                <p className="font-medium">Live Interview on Business Growth</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Medal className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Arab Business Review</p>
                <p className="font-medium">Cover Story: Entrepreneurial Journey</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Awards & Recognition</h2>
          <Button variant="ghost" asChild>
            <a href="/awards" className="gap-2">
              View All <Award className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg">Business Excellence Award</h3>
              <p className="text-sm text-muted-foreground mt-1">UAE Chamber of Commerce • 2024</p>
              <p className="text-sm mt-3">Recognized for outstanding contribution to electronics trade.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg">Social Media Excellence</h3>
              <p className="text-sm text-muted-foreground mt-1">Digital Arabia • 2024</p>
              <p className="text-sm mt-3">Award for innovative digital marketing strategies.</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-lg">Eeung's Entrepreneur Award</h3>
              <p className="text-sm text-muted-foreground mt-1">Middle East Business Council • 2025</p>
              <p className="text-sm mt-3">For visionary leadership and business expansion.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSR & Community */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <HeartHandshake className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary mb-2">Community & Social Responsibility</h2>
              <p className="text-muted-foreground mb-4">
                Rooted in Islamic values, we are committed to giving back to society through employment creation, 
                youth support, and community welfare programs.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-xl font-bold text-primary">100+</div>
                  <p className="text-sm text-muted-foreground">Youth Employed</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">500+</div>
                  <p className="text-sm text-muted-foreground">Families Supported</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">AED 500K+</div>
                  <p className="text-sm text-muted-foreground">Annual CSR Budget</p>
                </div>
                <div>
                  <div className="text-xl font-bold text-primary">10+</div>
                  <p className="text-sm text-muted-foreground">Community Projects</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Why Partner With Us</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold">Proven Track Record</h4>
              <p className="text-sm text-muted-foreground mt-1">12+ years of excellence</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold">50,000+ Clients</h4>
              <p className="text-sm text-muted-foreground mt-1">Trusted across GCC</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold">Certified Quality</h4>
              <p className="text-sm text-muted-foreground mt-1">Authorized dealer</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-bold">GCC Coverage</h4>
              <p className="text-sm text-muted-foreground mt-1">5+ strategic locations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA - Business Inquiry */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-primary to-primary/90 text-white">
        <CardContent className="p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Partner with a trusted electronics supplier. Whether you're looking for wholesale partnerships, 
            bulk orders, or distribution rights, our team is ready to assist.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8">
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales Team
            </Button>
            <Button size="lg" variant="outline" className="bg-gray-700 border-white text-white hover:bg-white/10 px-8">
              <Mail className="mr-2 h-5 w-5" />
              Send Inquiry
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            📞 +971 4 123 4567 • ✉️ sales@mustaqbal-zamzam.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}