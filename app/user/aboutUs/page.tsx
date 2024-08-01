'use client'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useTheme } from '../../../context/ThemeContext'
import { stylesMui } from '@/components/styles'
import AboutUsSection from '@/components/AboutUsSection/AboutUsSection'
import Paragraph from '@/components/AboutUsSection/Paragraph'

const AboutUs = () => {
  const { theme } = useTheme()
  const [isDark, setisDark] = useState(theme.palette.mode)

  const SectionRowsData = [
    {
      SectionTitle: 'What is Pollen Hive?',
      SectionText:
        'Pollen Hive is a web app that focuses on bringing people together and connecting them with their niche. Reply guys, artists, influencers, etc. can all benefit from supporting each other in return for being supported. We call this “semi-organic engagement,” as all users in the Hive are real people who, through Pollen, simply have their attention aligned towards growing together. Pollen Hive is the ultimate (3,3) ethos in web3. You support others and they support you— now in a verifiable and fair way.',
    },
    {
      SectionTitle: 'How Does it Work?',
      SectionText:
        'New users come to the site and sign in using their X account. Pollen requests Read Only access and has no control over your account, nor access to your email. Join an open Hive that fits your needs (such as art, crypto, personal growth etc). The more users in the Hive, the better. From there, you will have a list of posts to engage with (maximum 20). Clicking on “Visit Post” will send you to the post and fill the checkmark next to it. Once all checkmarks are filled, the “Verify Engagement” button will open. Once engagements are completed, press the “Verify Engagement” button. If it verifies successfully, the “Create Post” button will open. Press the “Create Post” button. You can now paste a link to your own post, which will be shown to all other members. Now just sit back and relax as other users support your content! Every engagement, post, referred user, and engagement done by a referred user earns you points for our upcoming Airdrop. Win-win.',
    },
    {
      SectionTitle: 'Important Notes',
      SectionText:
        'Likes are required as an engagement Comments and RTs are optional but encouraged, especially because they strengthen connections with other members Following each other is recommended to avoid shadow bans Users who were inactive for 3 days are auto removed from their Hive Users can opt to exit a group 1 day after joining it No NSFW or political posts',
    },
    {
      SectionTitle: 'I Did Everything, But Failed Verifying My Engagement. Why?',
      SectionText:
        'There’s a couple of reasons this may have happened: The first and most likely: you’re shadow banned! Pollen does not count engagements made by shadow banned accounts. To check if you’re shadow banned (NOTE: most shadowban websites no longer work): Use an account that does not follow you View your profile from this account Click on Replies to view your recent replies Click on a post your account replied to Scroll down and check to see if your reply was hidden as spam If it was hidden, take a break from using X or purchase a Blue checkmark until your shadow ban is lifted There may be a broken link in the list. If a post you were sent to says it was deleted or edited, it cannot be engaged with. In this case, press the “scrap” button to the right of the link to remove it from your list The account you connected to Pollen Hive might not be the same account that’s signed in on X. This is an easy fix: sign into the right account! You may have reached your “Like” limit on X. If this is the case, take a break from liking posts until it’s restored. There’s a rare chance our backend failed to catch your engagement on a post. In this case, re-liking the post will fix it. If the list is long and you’re unsure which post failed, DM @PollenHive or @blupandaman on X and we will let you know! If none of these resolved your issue, DM @PollenHive or @blupandaman on X. Welcome to Pollen Hive!',
    },
  ]

  useEffect(() => {
    if (theme.palette.mode === 'dark') {
      setisDark(true)
    } else {
      setisDark(false)
    }
  }, [theme])

  return (
    <>
      <div
        id='wrapper'
        className='min-h-screen'
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <div
          className=' px-6 pt-6 lg:px-20 lg:pt-12'
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Typography sx={stylesMui.h1}>About Pollen</Typography>
        </div>
        <AboutUsSection />
      </div>
    </>
  )
}

export default AboutUs
