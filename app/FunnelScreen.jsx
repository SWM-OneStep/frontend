import React, { useContext } from 'react';
import { StyleSheet, Platform, Linking } from 'react-native';
import { useFunnel } from '../hooks/funnel/useFunnel';
import {
  Layout,
  Text,
  Select,
  SelectItem,
  Button,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import messaging from '@react-native-firebase/messaging';
import { useRouter } from 'expo-router';
import { FunnelContext } from '@/contexts/FunnelContext';
import useModal from '../hooks/common/useModal';
import ConfirmModal from '../components/common/molecules/ConfirmModal';

const FunnelScreen = () => {
  const { Funnel, setStep, goBack, currentStep } = useFunnel('Step1');
  const route = useRouter();
  const { setFunnelDone } = useContext(FunnelContext);
  const { isVisible, setIsVisible } = useModal();

  // 직업과 나이 옵션 데이터
  const jobOptions = ['개발자', '디자이너', '기획자', '마케터', '기타'];
  const ageOptions = ['10대', '20대', '30대', '40대', '50대 이상'];

  // 상태 관리
  const [selectedJobIndex, setSelectedJobIndex] = React.useState(null);
  const [selectedAgeIndex, setSelectedAgeIndex] = React.useState(null);

  // 알림 권한 요청 함수
  const requestNotificationPermission = async () => {
    try {
      const authStatus = await messaging().hasPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // 권한이 이미 허용됨
        return true;
      } else {
        if (Platform.OS === 'ios') {
          // iOS에서 권한 요청
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          return enabled;
        } else if (Platform.OS === 'android') {
          // Android에서 버전 확인
          const androidVersion = Platform.Version;
          if (androidVersion >= 33) {
            // Android 13 이상에서 권한 요청
            const result = await messaging().requestPermission();
            const enabled = result === messaging.AuthorizationStatus.AUTHORIZED;
            return enabled;
          } else {
            // Android 13 미만은 권한 요청 불필요
            return true;
          }
        } else {
          // 기타 플랫폼 (web 등)
          return false;
        }
      }
    } catch (error) {
      console.error('Notification permission error:', error);
      return false;
    }
  };

  // 애니메이션 Ref
  const ageSelectRef = React.useRef(null);
  const nextButtonRef = React.useRef(null);

  // 직업이 선택되었을 때 나이 드롭다운 애니메이션 실행
  React.useEffect(() => {
    if (selectedJobIndex !== null && ageSelectRef.current) {
      ageSelectRef.current.fadeInUp(500);
    }
  }, [selectedJobIndex]);

  // 나이가 선택되었을 때 다음 버튼 애니메이션 실행
  React.useEffect(() => {
    if (selectedAgeIndex !== null && nextButtonRef.current) {
      nextButtonRef.current.fadeInUp(500);
    }
  }, [selectedAgeIndex]);

  // Back Icon Component
  const BackIcon = props => <Icon {...props} name="arrow-back" />;

  // Back Action Component
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={handleBackAction} />
  );

  // Handle Back Button Press
  const handleBackAction = () => {
    if (currentStep === 'Step1') {
      route.back();
    } else {
      goBack();
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      {/* 커스텀 헤더 */}
      <TopNavigation
        accessoryLeft={BackAction}
        alignment="center"
        title=""
        style={{ marginTop: 30 }}
      />

      {/* 펀넬 내용 */}
      <Funnel>
        {/* Step 1 */}
        <Funnel.Step name="Step1">
          <Layout style={styles.container}>
            <Text category="h5" style={styles.title}>
              직업과 나이를 선택해주세요
            </Text>

            {/* 직업 드롭다운 */}
            <Select
              placeholder="직업을 선택하세요"
              value={
                selectedJobIndex !== null
                  ? jobOptions[selectedJobIndex.row]
                  : ''
              }
              selectedIndex={selectedJobIndex}
              onSelect={index => {
                setSelectedJobIndex(index);
                setSelectedAgeIndex(null); // 직업 변경 시 나이 초기화
              }}
              style={styles.select}
            >
              {jobOptions.map((title, index) => (
                <SelectItem title={title} key={index} />
              ))}
            </Select>

            {/* 직업이 선택되면 나이 드롭다운 표시 */}
            {selectedJobIndex !== null && (
              <Animatable.View ref={ageSelectRef} style={styles.animatableView}>
                <Select
                  placeholder="나이를 선택하세요"
                  value={
                    selectedAgeIndex !== null
                      ? ageOptions[selectedAgeIndex.row]
                      : ''
                  }
                  selectedIndex={selectedAgeIndex}
                  onSelect={index => setSelectedAgeIndex(index)}
                  style={styles.select}
                >
                  {ageOptions.map((title, index) => (
                    <SelectItem title={title} key={index} />
                  ))}
                </Select>
              </Animatable.View>
            )}

            {/* 나이가 선택되면 다음 버튼 표시 */}
            {selectedAgeIndex !== null && (
              <Animatable.View
                ref={nextButtonRef}
                style={styles.animatableView}
              >
                <Button
                  style={styles.button}
                  onPress={() => {
                    setStep('Step2');
                  }}
                >
                  다음
                </Button>
              </Animatable.View>
            )}
          </Layout>
        </Funnel.Step>

        {/* Step 2 */}
        <Funnel.Step name="Step2">
          <Layout style={styles.container}>
            <Text category="h5" style={styles.title}>
              알림을 허용하시겠습니까?
            </Text>
            <Button
              style={styles.button}
              onPress={async () => {
                const granted = await requestNotificationPermission();
                if (granted) {
                  setStep('Step3');
                } else {
                  setIsVisible(true);
                }
              }}
            >
              알림 허용
            </Button>
          </Layout>
          <ConfirmModal
            visible={isVisible}
            onConfirm={() => {
              setIsVisible(false);
              setStep('Step3');
            }}
            onCancel={() => {
              setIsVisible(false);
              Linking.openSettings();
            }}
            titleKey=""
            messageKey=""
            confirmTextKey=""
            cancelTextKey=""
          />
        </Funnel.Step>

        {/* Step 3 */}
        <Funnel.Step name="Step3">
          <Layout style={styles.container}>
            <Text category="h5" style={styles.title}>
              설정이 완료되었습니다!
            </Text>
            <Button style={styles.button} onPress={() => setFunnelDone(true)}>
              투두 만들러 가기
            </Button>
          </Layout>
        </Funnel.Step>
      </Funnel>
    </Layout>
  );
};

export default FunnelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  select: {
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
  },
  animatableView: {
    width: '100%',
  },
});
