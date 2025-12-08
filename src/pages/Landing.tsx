
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle, BarChart4, Shield, Brain, X, ArrowRight, Globe, Rocket, Phone, Lightbulb, FileCheck, Scale, Settings, TrendingDown, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
// import ScheduleMeeting from './ScheduleMeeting';
const Landing: React.FC = () => {
  const { user } = useAuth();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const [open, setOpen] = useState(false);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation - Updated with blue background and white text */}


      {/* Hero Section - Updated with new image */}
      <section id="hero" className="trustiq-gradient text-white pb-20 lg:pb-32 pt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1688380948869-5658114e40c0?auto=format&fit=crop&q=80&w=1000')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-2 border border-white/20 font-primary">
                AI-Powered Trust at Scale
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white font-primary">
                Launch AI-Powered <span className="text-trustiq-teal">Lending Agents in Just 7 Days</span>
              </h1>
              <p className="text-xl text-trustiq-neutral-100">
                Reduce manual verification, underwriting, and compliance workload with plug-and-play AI agents built for lending teams, LOS platforms, and digital lenders. Integrates natively with any tech stack without needing to rebuild your systems.
              </p>
              <div className="flex flex-wrap gap-4">
                  <Link to="/schedule-meeting">
                    <Button size="lg" className="bg-trustiq-teal hover:bg-trustiq-teal-600 text-trustiq-blue-900  font-primary font-semibold">
                      Book Live Demo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                {/* <ScheduleMeeting className="bg-trustiq-teal hover:bg-trustiq-teal-600 text-trustiq-blue-900  font-primary font-semibold" /> */}
                {/* <Link to="/auth">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                    Request Demo
                  </Button>
                </Link> */}
              </div>
            </div>
            <div className="hidden md:block">
              {/* <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/20 transform rotate-1 hover:rotate-0 transition-all duration-300"> */}
              <img
                src="banner.png"
                id="autoHeightImage"
                className="object-cover w-full"
              // style={{ boxShadow: '0 0 8px 0px #078586', height: '400px' }}
              />
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* {Stats Section} */}
      <section className="py-20 bg-trustiq-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <h2 className="text-xl lg:text-3xl md:text-4xl font-bold text-tech-accent mb-2 font-primary">40+</h2>
              <p className="text-l text-gray-600 leading-relaxed">AI Lending Agents <br /> Configured & Deployed</p>
            </div>
            <div className="text-center"  >
              <h2 className="text-xl lg:text-3xl md:text-4xl font-bold text-tech-accent mb-2 font-primary">7 Days</h2>
              <p className="text-l text-gray-600 leading-relaxed">Avg Time to Go Live <br />
                with LOS</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl lg:text-3xl md:text-4xl font-bold text-tech-accent mb-2 font-primary">100%</h2>
              <p className="text-l text-gray-600 leading-relaxed">Whitelabeled Deployment <br />
                Support</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl lg:text-3xl md:text-4xl font-bold text-tech-accent mb-2 font-primary">60%</h2>
              <p className="text-l text-gray-600 leading-relaxed">Reduction in Manual <br />
                Underwriting Effort</p>
            </div>
          </div>
        </div>
      </section>

      {/* { Problem Section} */}
      <section id="problem-section" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">

            <div className="relative">
              <img
                src="/the_problem.png"
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-8">
              <div className="mb-4 md:mb-8 lg:mb-16">
                <h2
                  className="text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6 font-primary"
                >
                  The Problem
                </h2>
                <p className="text-l text-gray-500 leading-relaxed">
                  Manual borrower evaluation, fragmented document review, repeated data entry, inconsistent underwriting decisions, long onboarding cycles, and compliance risk slow down growth and increase operational cost.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-trustiq-blue-900 mb-8 font-primary">The Value Proposition</h2>

                <div className="grid md:grid-cols-1 gap-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileCheck className="h-6 w-6 text-trustiq-teal" />
                      </div>
                      <p className="text-lg text-trustiq-neutral-700 pt-2">Automate document validations and verification</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Scale className="h-6 w-6 text-trustiq-teal" />
                      </div>
                      <p className="text-lg text-trustiq-neutral-700 pt-2">Standardize underwriting decisions across agents and policies</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Rocket className="h-6 w-6 text-trustiq-teal" />
                      </div>
                      <p className="text-lg text-trustiq-neutral-700 pt-2">Deploy within 7 days without changing your existing LOS</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Settings className="h-6 w-6 text-trustiq-teal" />
                      </div>
                      <p className="text-lg text-trustiq-neutral-700 pt-2">Allow internal teams to create and modify workflows independently</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="h-6 w-6 text-trustiq-teal" />
                      </div>
                      <p className="text-lg text-trustiq-neutral-700 pt-2">Reduce escalations, manual effort and turnaround time</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Built For Section */}
      <section id="built-for" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-trustiq-blue-900 mb-4 font-primary">Built For
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="h-1 bg-trustiq-teal w-full"></div>
              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">

                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-primary">Lending companies and NBFCs
                </h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="h-1 bg-trustiq-teal w-full"></div>
              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">

                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <Brain className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-primary">Digital and embedded lending platforms</h3>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="h-1 bg-trustiq-teal w-full"></div>
              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">

                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-primary">LOS and LMS providers
                </h3>

              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="h-1 bg-trustiq-teal w-full"></div>
              <CardContent className="p-8">
                <div className="flex justify-center items-center">

                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-primary">BFSI and fintech underwriting teams
                </h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="h-1 bg-trustiq-teal w-full"></div>
              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">

                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 font-primary">BNPL and co-lending platforms

                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-trustiq-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-trustiq-blue-900 mb-4 font-primary">Use Cases</h2>
            <p className="text-lg text-trustiq-neutral-600">Deploy specialized AI agents for every step of your lending workflow.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Identity Verification
                </h3>
                <p className="text-trustiq-neutral-600">Auto-verify identity, match data across documents, detect tampering and highlight discrepancies.</p>

              </CardContent>
            </Card>

            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Eligibility Check</h3>
                <p className="text-trustiq-neutral-600">Assess eligibility, compare against loan policies, identify exceptions and calculate affordability.</p>

              </CardContent>
            </Card>

            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Financials Analyser
                </h3>
                <p className="text-trustiq-neutral-600">Analyze bank statements, income proofs, ratios, transaction behavior and repayment capability.</p>

              </CardContent>
            </Card>
            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Business Documents Verifier
                </h3>
                <p className="text-trustiq-neutral-600">Review business registrations, licenses, ownership structure, financial history and compliance readiness.</p>

              </CardContent>
            </Card>
            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Property Agent
                </h3>
                <p className="text-trustiq-neutral-600">Evaluate property documents, valuation inputs, geographic checks, encumbrances and validation points.</p>

              </CardContent>
            </Card>
            <Card
              className="shadow-md hover:shadow-lg transition-shadow border-2 border-dashed border-[rgba(7,133,134,0.3)]"

            >
              <CardContent className="p-6 space-y-4">
                <div className="bg-trustiq-teal/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-trustiq-teal" />
                </div>
                <h3 className="text-xl font-semibold font-primary">Custom Agent
                </h3>
                <p className="text-trustiq-neutral-600">Create custom agents based on unique loan products, underwriting frameworks or industry-specific rules, without code changes.</p>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Introducing Agent Builder for Lending Tech */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-trustiq-blue-900 mb-4 font-primary">Introducing Agent Builder for Lending Tech
            </h2>
            <p className="text-lg text-trustiq-neutral-600">A configurable, no-code AI platform that allows lending teams to create, deploy and manage intelligent agents and workflows. The solution is fully whitelabeled and integrates natively with any existing LOS, regardless of technology stack or form builder architecture.</p>
          </div>

          <div className="text-center mb-16">
            <Link to="/schedule-meeting">
              <Button size="lg" className="bg-trustiq-teal hover:bg-trustiq-teal-600 text-trustiq-blue-900 font-primary">
                Book Live Demo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            {/* <ScheduleMeeting className="bg-trustiq-teal hover:bg-trustiq-teal-600 text-trustiq-blue-900  font-primary font-semibold" /> */}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Handles multi-step and dynamic application structures

                </h3>

              </CardContent>
            </Card>

            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Compatible with modern and legacy systems without rebuild
                </h3>

              </CardContent>
            </Card>
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Works with PDFs, images, screenshots, and digital forms
                </h3>

              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-trustiq-blue-900 mb-4 font-primary">How It Works
            </h2>
            <p className="text-lg text-trustiq-neutral-600">From integration to deployment in days, not months.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Deployment Flow
                </h3>
                <ol className="list-decimal list-inside text-left text-trustiq-neutral-600 space-y-1">
                  <li>Requirement mapping with sample data</li>
                  <li>Agent creation and workflow design</li>
                  <li>Integration with existing LOS or API endpoints</li>
                  <li>Testing with real use cases</li>
                  <li>Frontend integration in existing LOS</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Integrations
                </h3>
                <ol className="list-decimal list-inside text-left text-trustiq-neutral-600 space-y-1">
                  <li> Works with any LOS or LMS</li>
                  <li>REST APIs, webhooks, sandbox and embeddable widgets</li>
                  <li>Cloud, on-premise and private VPC options</li>
                  <li>Supports multi-tenant and whitelabeled deployments</li>
                </ol>
              </CardContent>

            </Card>

            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow bg-white overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-1 bg-trustiq-teal"></div>

              <CardContent className="p-8 flex justify-center flex-col text-center">
                <div className="flex justify-center items-center">
                  <div className="h-12 w-12 bg-trustiq-teal/10 rounded-lg flex items-center justify-center mb-6">
                    <BarChart4 className="h-6 w-6 text-trustiq-teal" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-5 font-primary">
                  Security & Compliance

                </h3>
                <ol className="list-decimal list-inside text-left text-trustiq-neutral-600 space-y-1">
                  <li>Encryption in transit and at rest</li>
                  <li>Role-based access controls</li>
                  <li>Comprehensive audit logs and explainability</li>
                  <li>Built to align with lending and data security regulations</li>

                </ol>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-white">
        <div
          className="w-full  bg-opacity-90 bg-blend-multiply py-10 "
          style={{
            backgroundImage:
              "url('https://tts-website-images.s3.ap-south-1.amazonaws.com/home-11-footer-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">

              {/* LEFT TEXT AREA */}
              <div className="max-w-3xl text-white">
                <h2 className="text-3xl md:text-4xl mb-4 text-white text-[38px] leading-[50px] font-bold  pb-[10px]">
                  Let's Build Something Smart <br /> Together
                </h2>

                <p className="text-lg mb-3 text-white">
                  No fluff. No lock-ins. Just intelligent products, built right.
                </p>

                <p className="flex flex-wrap items-center gap-4 text-lg text-white">
                  <span className="flex items-center gap-1">
                    <Rocket className="h-5 w-5 text-pink-300" />
                    Free consultation
                  </span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Phone className="h-5 w-5 text-pink-300" />
                    Same-day response
                  </span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Lightbulb className="h-5 w-5 text-yellow-300" />
                    No commitment required
                  </span>
                </p>
              </div>

              {/* RIGHT BUTTON */}
              <div className="mt-6 md:mt-0">
                {/* <ScheduleMeeting
                  className="bg-gray-900 text-white px-8 py-6 rounded-lg text-lg font-semibold hover:bg-gray-800 transition font-primary"
                  buttonText="Schedule a Call"
                /> */}
                <a
                  href="/schedule-meeting"
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
                >
                  Schedule a Call
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}


      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50 animate-fade-in">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-trustiq-neutral-700">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowCookieBanner(false)}>
                Decline
              </Button>
              <Button size="sm" onClick={acceptCookies}>
                Accept Cookies
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
