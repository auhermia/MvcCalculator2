CREATE TABLE [dbo].[Calculators] (
    [Id]       INT  IDENTITY (1, 1) NOT NULL,
    [Operand1] FLOAT NOT NULL,
    [Operand2] FLOAT NOT NULL,
    [Result]   FLOAT NOT NULL,
    [Operator] NCHAR(10) NULL, 
    CONSTRAINT [PK_dbo.Calculators] PRIMARY KEY CLUSTERED ([Id] ASC)
);

