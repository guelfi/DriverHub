CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    migration_id character varying(150) NOT NULL,
    product_version character varying(32) NOT NULL,
    CONSTRAINT pk___ef_migrations_history PRIMARY KEY (migration_id)
);

START TRANSACTION;
CREATE TABLE motoristas (
    id uuid NOT NULL,
    nome character varying(255) NOT NULL,
    sobrenome text NOT NULL,
    email character varying(255) NOT NULL,
    senha_hash character varying(255) NOT NULL,
    sal character varying(255) NOT NULL,
    numero_celular character varying(20) NOT NULL,
    aluguel_semanal_veiculo numeric(18,2) NOT NULL,
    dias_trabalhados_por_semana integer NOT NULL,
    autonomia_veiculo_km_por_litro numeric(18,2) NOT NULL,
    data_cadastro timestamp with time zone NOT NULL,
    role integer NOT NULL,
    CONSTRAINT pk_motoristas PRIMARY KEY (id)
);

CREATE TABLE viagens (
    id uuid NOT NULL,
    motorista_id uuid NOT NULL,
    data_viagem timestamp with time zone NOT NULL,
    origem character varying(255) NOT NULL,
    destino character varying(255) NOT NULL,
    distancia_km numeric(18,2) NOT NULL,
    valor_recebido numeric(18,2) NOT NULL,
    custo_combustivel numeric(18,2) NOT NULL,
    lucro numeric(18,2) NOT NULL,
    CONSTRAINT pk_viagens PRIMARY KEY (id),
    CONSTRAINT fk_viagens_motoristas_motorista_id FOREIGN KEY (motorista_id) REFERENCES motoristas (id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ix_motoristas_email ON motoristas (email);

CREATE INDEX ix_viagens_motorista_id ON viagens (motorista_id);

INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
VALUES ('20250712034510_InitialCreateSnakeCase', '9.0.7');

CREATE TABLE despesas_pessoais (
    id uuid NOT NULL,
    motorista_id uuid NOT NULL,
    data timestamp with time zone NOT NULL,
    valor numeric(18,2) NOT NULL,
    descricao character varying(500) NOT NULL,
    categoria character varying(100) NOT NULL,
    CONSTRAINT pk_despesas_pessoais PRIMARY KEY (id),
    CONSTRAINT fk_despesas_pessoais_motoristas_motorista_id FOREIGN KEY (motorista_id) REFERENCES motoristas (id) ON DELETE CASCADE
);

CREATE TABLE lancamentos_diarios (
    id uuid NOT NULL,
    motorista_id uuid NOT NULL,
    data timestamp with time zone NOT NULL,
    valor numeric(18,2) NOT NULL,
    descricao character varying(500) NOT NULL,
    tipo character varying(50) NOT NULL,
    CONSTRAINT pk_lancamentos_diarios PRIMARY KEY (id),
    CONSTRAINT fk_lancamentos_diarios_motoristas_motorista_id FOREIGN KEY (motorista_id) REFERENCES motoristas (id) ON DELETE CASCADE
);

CREATE INDEX ix_despesas_pessoais_motorista_id ON despesas_pessoais (motorista_id);

CREATE INDEX ix_lancamentos_diarios_motorista_id ON lancamentos_diarios (motorista_id);

INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
VALUES ('20250713234201_AddFinancialEntities', '9.0.7');

ALTER TABLE motoristas DROP COLUMN role;

ALTER TABLE viagens ALTER COLUMN valor_recebido TYPE numeric;

ALTER TABLE viagens ALTER COLUMN origem TYPE text;

ALTER TABLE viagens ALTER COLUMN lucro TYPE numeric;

ALTER TABLE viagens ALTER COLUMN distancia_km TYPE numeric;

ALTER TABLE viagens ALTER COLUMN destino TYPE text;

ALTER TABLE viagens ALTER COLUMN custo_combustivel TYPE numeric;

ALTER TABLE motoristas ALTER COLUMN senha_hash TYPE text;

ALTER TABLE motoristas ALTER COLUMN sal TYPE text;

ALTER TABLE motoristas ALTER COLUMN numero_celular TYPE text;

ALTER TABLE motoristas ALTER COLUMN nome TYPE text;

ALTER TABLE motoristas ALTER COLUMN email TYPE text;

ALTER TABLE motoristas ALTER COLUMN autonomia_veiculo_km_por_litro TYPE numeric;

ALTER TABLE motoristas ALTER COLUMN aluguel_semanal_veiculo TYPE numeric;

ALTER TABLE lancamentos_diarios ALTER COLUMN valor TYPE numeric;

ALTER TABLE lancamentos_diarios ALTER COLUMN tipo TYPE text;

ALTER TABLE lancamentos_diarios ALTER COLUMN descricao TYPE text;

ALTER TABLE lancamentos_diarios ADD motorista_id1 uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

ALTER TABLE despesas_pessoais ALTER COLUMN valor TYPE numeric;

ALTER TABLE despesas_pessoais ALTER COLUMN descricao TYPE text;

ALTER TABLE despesas_pessoais ALTER COLUMN categoria TYPE text;

ALTER TABLE despesas_pessoais ADD motorista_id1 uuid NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

CREATE TABLE admins (
    id uuid NOT NULL,
    nome text NOT NULL,
    sobrenome text NOT NULL,
    email text NOT NULL,
    senha_hash text NOT NULL,
    sal text NOT NULL,
    data_cadastro timestamp with time zone NOT NULL,
    CONSTRAINT pk_admins PRIMARY KEY (id)
);

CREATE INDEX ix_lancamentos_diarios_motorista_id1 ON lancamentos_diarios (motorista_id1);

CREATE INDEX ix_despesas_pessoais_motorista_id1 ON despesas_pessoais (motorista_id1);

CREATE UNIQUE INDEX ix_admins_email ON admins (email);

ALTER TABLE despesas_pessoais ADD CONSTRAINT fk_despesas_pessoais_motoristas_motorista_id1 FOREIGN KEY (motorista_id1) REFERENCES motoristas (id) ON DELETE CASCADE;

ALTER TABLE lancamentos_diarios ADD CONSTRAINT fk_lancamentos_diarios_motoristas_motorista_id1 FOREIGN KEY (motorista_id1) REFERENCES motoristas (id) ON DELETE CASCADE;

INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
VALUES ('20250715045316_SeparateAdminEntity', '9.0.7');

ALTER TABLE despesas_pessoais DROP CONSTRAINT fk_despesas_pessoais_motoristas_motorista_id1;

ALTER TABLE lancamentos_diarios DROP CONSTRAINT fk_lancamentos_diarios_motoristas_motorista_id1;

DROP INDEX ix_lancamentos_diarios_motorista_id1;

DROP INDEX ix_despesas_pessoais_motorista_id1;

ALTER TABLE lancamentos_diarios DROP COLUMN motorista_id1;

ALTER TABLE despesas_pessoais DROP COLUMN motorista_id1;

INSERT INTO "__EFMigrationsHistory" (migration_id, product_version)
VALUES ('20250715133010_AddLancamentosAndDespesasToMotorista', '9.0.7');

COMMIT;

