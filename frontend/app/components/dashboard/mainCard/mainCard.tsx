import { Card, CardBody, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TodayTransactionsPanel from "./todayTransactionsPanel/todayTransactionsPanel";

const MainCard = () => {
  return (
    <Card>
      <CardBody>
        <Tabs isFitted variant="soft-rounded" size={"md"}>
          <TabList>
            <Tab>Today transactions</Tab>
            <Tab>Chart</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TodayTransactionsPanel />
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default MainCard;
