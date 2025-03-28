import React from 'react';
import { Link } from 'react-router-dom'
import { Users, Palette, Share2 } from 'lucide-react';
import './MainPage.css'

function MainPage() {
    return (
        <div className='mainPage'>
          <section className='mainPageWelocomeSection'>
            <div className='mainPageWelocomeContent'>
                <h1 className='mainPageWelocomeTitle'>
                    Create Your Professional Developer Resume
                </h1>
                <p className='mainPageWelocomeSubtitle'>
                    Hello, my name is Artem, i created this web application.
                    Showcase your skills, projects, and experience with a beautiful portfolio website. 
                    Join our community of developers and make your mark in the tech world.
                </p>
                <div className='mainPageWelocomeButtons'>
                    <Link to='/login' className='mainPageWelocomeButton mainPageLoginButton'>
                        GetStarted
                    </Link>
                    <Link to='/resume' className='mainPageWelocomeButton mainPageResumeButton'>
                        View Demo
                    </Link>
                </div>
            </div>
          </section>
          <section className='mainPageFeaturesSection'>
            <h2 className='mainPageFeaturesTitle'>Features</h2>
            <div className="features-grid">
                <FeatureCard
                    icon={<Users className='featureIcon' size={48}/>}
                    title='Build Your Profile'
                    description='Create a personalized portfolio that showcases your unique skills and experience. Stand out from the crowd with a professional online presence.'
                />
                <FeatureCard
                    icon={<Palette className='featureIcon' size={48}/>}
                    title='Build Your Profile'
                    description='Create a personalized portfolio that showcases your unique skills and experience. Stand out from the crowd with a professional online presence.'
                />
                <FeatureCard
                    icon={<Share2 className='featureIcon' size={48}/>}
                    title='Build Your Profile'
                    description='Create a personalized portfolio that showcases your unique skills and experience. Stand out from the crowd with a professional online presence.'
                />
            </div>
          </section>
          <section className='linkToResume'>
            <div className='linkToResumeContent'>
                <h2 className='linkToResumeTitle'>Ready to Create Your Resume?</h2>
                <p className='linkToResumeSubtitle'>Join thousands of developers who have already created their professional portfolios with us.</p>
                <div className='linkToResumeButton'>
                    <Link to='/login' className='mainPageWelocomeButton mainPageLoginButton'>
                        Create Your Resume
                    </Link>
                </div>
            </div>
          </section>
        </div>
        )
}

function FeatureCard({ icon, title, description }) {
    return (
      <div className="featureCard">
        <div className="featureIcon">{icon}</div>
        <h3 className="featureTitle">{title}</h3>
        <p className="featureDescription">{description}</p>
      </div>
    );
  }

export default MainPage