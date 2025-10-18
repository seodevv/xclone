import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import styles from './i.verifiedOrg.page.module.css';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import AccessSelector from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_component/AccessSelector';
import VerifiedOrgPayment from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_component/VerifiedOrgPayment';
import VerifiedOrgRecipe from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_component/VerifiedOrgRecipe';
import VerifiedOrgProvider from '@/app/(afterLogin)/@i/(.)i/verified-orgs-signup/_provider/VerifiedOrgProvider';

export default function IVerifiedOrgSignUpSlot() {
  return (
    <VerifiedOrgProvider>
      <IBackground overflow="auto">
        <AddHistoryStack />
        <IHeader title="Verified Organizations" />
        <div className={styles.container}>
          <div className={styles.body}>
            <AccessSelector />
            <VerifiedOrgRecipe />
            <VerifiedOrgPayment />
          </div>
        </div>
      </IBackground>
    </VerifiedOrgProvider>
  );
}
