"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as SubframeCore from "@subframe/core";
import { TextField } from "@/subframe/components/TextField";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { Table } from "@/subframe/components/Table";
import { Checkbox } from "@/subframe/components/Checkbox";
import { Tooltip } from "@/subframe/components/Tooltip";
import { Badge } from "@/subframe/components/Badge";
import { Switch } from "@/subframe/components/Switch";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { Alert } from "@/subframe/components/Alert";
import { DefaultPageLayout } from "@/layouts/DefaultPageLayout";
import { useUserStateContext } from "@/hooks/useAuth";
import useFinicApp from "@/hooks/useFinicApp";
import { Agent } from "@/types";

function AgentRow({
  bearer,
  initial_data,
}: {
  bearer: string;
  initial_data: Agent;
}) {
  const [agent, setAgent] = useState<Agent>(initial_data);
  const { setAgentStatus } = useFinicApp();
  const navigate = useNavigate();

  function handleToggleStatus(agentId: string, status: string) {
    setAgentStatus(bearer, agentId, status).then((data) => {
      setAgent(data);
    });
  }

  function handleRunAgent(agentId: string) {

  }

  function handleDeleteAgent(agentId: string) {
  }

  function handleEditAgent(agentId: string) {
  }

  return (
    <Table.Row key={agent.id}>
      <Table.Cell>
        <Button
          disabled={false}
          variant="neutral-primary"
          size="medium"
          icon={null}
          iconRight="FeatherArrowUpRight"
          loading={false}
          onClick={() => handleRunAgent(agent.id)}
        >
          Run
        </Button>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <SubframeCore.Icon
            className="text-heading-3 font-heading-3 text-default-font"
            name="FeatherTerminalSquare"
          />
          <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
            {agent.name}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <SubframeCore.Tooltip.Provider>
          <SubframeCore.Tooltip.Root>
            <SubframeCore.Tooltip.Trigger asChild={true}>
              <SubframeCore.Icon
                className="text-heading-3 font-heading-3 text-success-600"
                name="FeatherCheckCheck"
              />
            </SubframeCore.Tooltip.Trigger>
            <SubframeCore.Tooltip.Portal>
              <SubframeCore.Tooltip.Content
                side="bottom"
                align="center"
                sideOffset={4}
                asChild={true}
              >
                <Tooltip>
                  {agent.status === "success"
                    ? "Last Run Successful"
                    : agent.status === "failed"
                    ? "Last Run Failed"
                    : "Draft"}
                </Tooltip>
              </SubframeCore.Tooltip.Content>
            </SubframeCore.Tooltip.Portal>
          </SubframeCore.Tooltip.Root>
        </SubframeCore.Tooltip.Provider>
      </Table.Cell>
      <Table.Cell>
        <SubframeCore.Icon
          className="text-body font-body text-subtext-color"
          name="FeatherClock"
        />
        <span className="whitespace-nowrap text-body font-body text-neutral-500">
          1.8s
        </span>
      </Table.Cell>
      <Table.Cell>
        <SubframeCore.Icon
          className="text-body font-body text-subtext-color"
          name="FeatherUser"
        />
        <span className="whitespace-nowrap text-body font-body text-neutral-500">
          {agent.id}
        </span>
      </Table.Cell>
      <Table.Cell>
      <SubframeCore.DropdownMenu.Root>
        <SubframeCore.DropdownMenu.Trigger asChild={true}>
          <IconButton
            variant="neutral-secondary"
            icon="FeatherMoreHorizontal"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          />
        </SubframeCore.DropdownMenu.Trigger>
        <SubframeCore.DropdownMenu.Portal>
          <SubframeCore.DropdownMenu.Content
            side="bottom"
            align="start"
            sideOffset={4}
            asChild={true}
          >
            <DropdownMenu>
              <DropdownMenu.DropdownItem icon="FeatherEdit2" onClick={() => handleEditAgent(agent.id)}>
                Edit
              </DropdownMenu.DropdownItem>
              <DropdownMenu.DropdownItem icon="FeatherTrash" onClick={() => handleDeleteAgent(agent.id)}>
                Delete
              </DropdownMenu.DropdownItem>
            </DropdownMenu>
          </SubframeCore.DropdownMenu.Content>
        </SubframeCore.DropdownMenu.Portal>
      </SubframeCore.DropdownMenu.Root>
      </Table.Cell>
    </Table.Row>
  );
}

export function DeploymentPage() {
  const [agents, setAgents] = useState<Array<Agent>>([]);
  const { createAgent, listAgents, setAgentStatus, isLoading } =
    useFinicApp();
  const { bearer } = useUserStateContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (bearer) {
      listAgents(bearer).then((data) => {
        if (data) {
          setAgents(data);
        }
      });
    }
  }, [bearer]);

  function handleCreateAgent() {
    createAgent(bearer).then((data) => {
      navigate(`/agent/${data.id}`);
    });
  }

  return (
    <DefaultPageLayout>
      <div className="flex w-full flex-col items-start gap-6 pt-6 pr-6 pb-6 pl-6">
        <Alert
          variant="neutral"
          icon="FeatherLoader2"
          title="Amazon Scraper Running"
          description="Click here to view the status."
          actions={
            <IconButton
              size="medium"
              icon="FeatherX"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
          }
        />
        <div className="flex flex-col items-start gap-2">
          <span className="text-heading-1 font-heading-1 text-default-font">
            Deployment
          </span>
          <span className="text-body font-body text-default-font">
            View, edit, and run your deployed agents.
          </span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="flex grow shrink-0 basis-0 items-center gap-1">
            {/* <TextField
              variant="filled"
              label=""
              helpText=""
              icon="FeatherSearch"
            >
              <TextField.Input
                placeholder="Search agents..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField> */}
            {/* <Button
              variant="neutral-tertiary"
              iconRight="FeatherChevronDown"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Last 7 days
            </Button> */}
          </div>
          <div className="flex items-center gap-2 mobile:h-auto mobile:w-auto mobile:flex-none">
            {/* <IconButton
              icon="FeatherRefreshCw"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon="FeatherSettings"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            /> */}
            <Button
              className="mobile:h-8 mobile:w-auto mobile:flex-none"
              icon="FeatherPlus"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                handleCreateAgent();
              }}
            >
              New Agent
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-2 overflow-hidden rounded border border-solid border-neutral-border bg-default-background shadow-default overflow-auto">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell />
                <Table.HeaderCell>Agent Name</Table.HeaderCell>
                <Table.HeaderCell>Last Run Status</Table.HeaderCell>
                <Table.HeaderCell>Last Run Date</Table.HeaderCell>
                <Table.HeaderCell>Agent ID</Table.HeaderCell>
                <Table.HeaderCell>-</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {!isLoading && agents.length > 0
              ? agents
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((agent, index) => (
                    <AgentRow bearer={bearer} initial_data={agent} />
                  ))
              : null}
          </Table>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-auto mobile:overflow-auto mobile:max-w-full" />
    </DefaultPageLayout>
  );
}

export default DeploymentPage;