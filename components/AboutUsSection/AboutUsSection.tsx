'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Typography } from '@mui/material'

import { useTheme } from 'context/ThemeContext'

import { stylesMui } from '../styles'
import Paragraph from './Paragraph'

const AboutUsSection: React.FC<any> = () => {
  const { theme } = useTheme()
  const [isDark, setIsDark] = useState(theme.palette.mode)
  const router = useRouter()

  const section2 = [
    'New users come to the site and sign in using their X account. Pollen requests Read Only access and has no control over your account, nor access to your email.',
    'Join an open Hive that fits your needs (such as art, crypto, personal growth etc). The more users in the Hive, the better.',
    'From there, you will have a list of posts to engage with (maximum 20).',
    'Clicking on “Visit Post” will send you to the post and fill the checkmark next to it. Once all checkmarks are filled, the “Verify Engagement” button will open.',
    'Once engagements are completed, press the “Verify Engagement” button. If it verifies successfully, the “Create Post” button will open.',
    'Once engagements are completed, press the “Verify Engagement” button. If it verifies successfully, the “Create Post” button will open. Press the “Create Post” button. You can now paste a link to your own post, which will be shown to all other members. Now just sit back and relax as other users support your content! Every engagement, post, referred user, and engagement done by a referred user earns you points for our upcoming Airdrop.',
  ]
  const section3 = [
    'Likes are required as an engagement',
    'Comments and RTs are optional but encouraged, especially because they strengthen connections with other members',
    'Following each other is recommended to avoid shadow bans',
    'Users who were inactive for 3 days are auto removed from their Hive',
    'Users can opt to exit a group 1 day after joining it',
    'No NSFW or political posts',
  ]
  const section4 = [
    {
      id: 'a',
      text: 'The first and most likely: you’re shadow banned! Pollen does not count engagements made by shadow banned accounts. To check if you’re shadow banned (NOTE: most shadowban websites no longer work):',
      subText: [
        'Use an account that does not follow you',
        'View your profile from this account',
        'Click on Replies to view your recent replies',
        'Click on a post your account replied to',
        'Scroll down and check to see if your reply was hidden as spam',
        'If it was hidden, take a break from using X or purchase a Blue checkmark until your shadow ban is lifted',
      ],
    },
    {
      id: 'b',
      text: 'There may be a broken link in the list. If a post you were sent to says it was deleted or edited, it cannot be engaged with. In this case, press the “scrap” button to the right of the link to remove it from your list',
    },
    {
      id: 'c',
      text: 'The account you connected to Pollen Hive might not be the same account that’s signed in on X. This is an easy fix: sign into the right account!',
    },
    {
      id: 'd',
      text: 'You may have reached your “Like” limit on X. If this is the case, take a break from liking posts until it’s restored.',
    },
    {
      id: 'e',
      text: 'There’s a rare chance our backend failed to catch your engagement on a post. In this case, re-liking the post will fix it. If the list is long and you’re unsure which post failed, DM @PollenHive or @blupandaman on X and we will let you know!',
    },
  ]

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
  }, [theme])

  return (
    <div
      id='summary'
      className='flex flex-col flex-nowrap px-6 pt-4 lg:px-20 lg:pt-12'
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* ///////////////Section One /////////////////////////*/}
      <div
        className={`flex flex-col justify-start items-start rounded-[5px]  z-10 py-6 px-4 mb-[2%] ${
          isDark ? 'bg-[#201D17] border-[#DCDCDC]' : 'bg-white border-[#DCDCDC]'
        }`}
        style={{
          color: theme.palette.text.primary,
          boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
          transition: 'transform 0.3s ease',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={stylesMui.h2}>What is Pollen Hive?</Typography>
        <Paragraph
          text='Pollen Hive is a web app that focuses on bringing people together and connecting them
              with their niche.'
        />
        <Paragraph
          text='Reply guys, artists, influencers, etc. can all benefit from supporting each other in
              return for being supported. We call this “semi-organic engagement,” as all users in
              the Hive are real people who, through Pollen, simply have their attention aligned
              towards growing together.'
        />
        <Paragraph
          text='Pollen Hive is the ultimate (3,3) ethos in web3. You support others and they support
              you— now in a verifiable and fair way.'
        />
      </div>

      {/* ////////////////////Section 2////////////////////////// */}
      <div
        className={`flex flex-col justify-start items-start rounded-[5px]  z-10 py-6 px-4 mb-[2%] ${
          isDark ? 'bg-[#201D17] border-[#DCDCDC]' : 'bg-white border-[#DCDCDC]'
        }`}
        style={{
          color: theme.palette.text.primary,
          boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
          transition: 'transform 0.3s ease',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={stylesMui.h2}>How Does it Work?</Typography>

        {section2.map((text: string, index: number) => {
          return (
            <>
              <div key={index} className='flex items-center gap-2'>
                <p className='m-0 pt-[6px] self-baseline font-roboto text-[16px] leading-[26px] font-normal'>
                  {index + 1}.
                </p>
                <Paragraph text={text} />
              </div>
            </>
          )
        })}
      </div>
      {/* ////////////////////Section 3////////////////////////// */}
      <div
        className={`flex flex-col justify-start items-start rounded-[5px]  z-10 py-6 px-4 mb-[2%] ${
          isDark ? 'bg-[#201D17] border-[#DCDCDC]' : 'bg-white border-[#DCDCDC]'
        }`}
        style={{
          color: theme.palette.text.primary,
          boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
          transition: 'transform 0.3s ease',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={stylesMui.h2}>Important Notes</Typography>

        <ul>
          {section3.map((text: string, index: number) => {
            return (
              <>
                <ul>
                  <li key={index} className='list-disc'>
                    <Paragraph text={text} />
                  </li>
                </ul>
              </>
            )
          })}
        </ul>
      </div>

      {/* ///////////////Section 4 /////////////////////////*/}
      <div
        className={`flex flex-col justify-start items-start rounded-[5px]  z-10 py-6 px-4 mb-[2%] ${
          isDark ? 'bg-[#201D17] border-[#DCDCDC]' : 'bg-white border-[#DCDCDC]'
        }`}
        style={{
          color: theme.palette.text.primary,
          boxShadow: isDark ? 'none' : '0px 0px 15px 0px #3E3E3E1A',
          transition: 'transform 0.3s ease',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Typography sx={stylesMui.h2}>
          I did everything, but failed verifying my engagement. Why?
        </Typography>
        <Paragraph text='There’s a couple of reasons this may have happened:' />
        {section4.map((item: any, index: number) => {
          return (
            <div className='' key={index}>
              <div className='flex justify-center items-center gap-2 '>
                <p className='m-0 pt-[6px] self-baseline font-roboto text-[16px] leading-[26px] font-normal'>
                  {item.id}.
                </p>
                <Paragraph text={item.text} />
              </div>

              {item.subText &&
                item.subText.map((val: string, index: number) => {
                  return (
                    <ul key={index}>
                      <li className='list-disc'>
                        <Paragraph text={val} />
                      </li>
                    </ul>
                  )
                })}
            </div>
          )
        })}
        <Paragraph text='If none of these resolved your issue, DM @PollenHive or @blupandaman on X.' />
        <Paragraph text='Welcome to Pollen Hive!' />
      </div>
    </div>
  )
}

export default AboutUsSection
